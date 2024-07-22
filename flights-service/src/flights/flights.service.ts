import { HttpStatus, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { RpcException } from '@nestjs/microservices';
import { CreateFlightDto, PaginationFiltersDto, UpdateFlightDto } from './dto';
import { UpdateSeatsDto } from './dto/updateSeats.dto';
import { OriginDestinationDto } from './dto/origin-destination.dto';

@Injectable()
export class FlightsService extends PrismaClient implements OnModuleInit {

  private readonly logger = new Logger(FlightsService.name);
  onModuleInit() {
    this.$connect();
    this.logger.log("DB connected");

  }
  create(createFlightDto: CreateFlightDto) {
    return this.flight.create({
      data: createFlightDto
    });
  }

  async findAll(PaginationFiltersDto: PaginationFiltersDto) {
    const { page, limit } = PaginationFiltersDto;

    const total = await this.flight.count({
      where: {
        status: 1,
        availableSeats: {
          gt: 0
        },
        departureCity: PaginationFiltersDto.departureCity,
        arrivalCity: PaginationFiltersDto.arrivalCity,
        dateFlight: {
          gte: PaginationFiltersDto.startDate,
          lte: PaginationFiltersDto.endDate
        }
      }
    });
    const lastPage = Math.ceil(total / limit);
    try {

      return {
        data: await this.flight.findMany({
          take: limit,
          skip: (page - 1) * limit,
          where: {
            status: 1,
            departureCity: PaginationFiltersDto.departureCity,
            arrivalCity: PaginationFiltersDto.arrivalCity,
            dateFlight: {
              gte: PaginationFiltersDto.startDate,
              lte: PaginationFiltersDto.endDate
            }
          },
        }), meta: {
          total,
          page,
          lastPage
        }
      };

    } catch (error) {
      this.logger.error(`Error fetching flights: ${error.message}`, error.stack);
      throw error;
    }

  }

  async availability(originDestinationDto: OriginDestinationDto) {
    try {
      const flightsPromises = originDestinationDto.items.map(async i => {

        const flight = await this.flight.findMany({
          where: {
            status: 1,
            availableSeats: {
              gte: originDestinationDto.pax
            },
            departureCity: i.departureCity,
            arrivalCity: i.arrivalCity,
            dateFlight: {
              equals: i.departureDate.toISOString()
            }
          },
        });

        return {
          [`${i.departureCity}-${i.arrivalCity}`]:flight
        }
      });
      const flights = await Promise.all(flightsPromises);
      console.log(flights);

      return {
        itineraries : flights,
      };
    } catch (error) {
      this.logger.error(`Error fetching flights: ${error.message}`, error.stack);
      throw error;
    }

  }


  async findOne(id: number) {
    try {
      const flight = await this.flight.findFirst({
        where: {
          id,
          status: 1,
          availableSeats: {
            gt: 0
          },
        }
      });

      if (!flight)
        throw new RpcException(`flight is not availability`)

      return flight;

    } catch (error) {
      this.logger.error(`Error fetching flights: ${error.message}`, error.stack);
      throw new RpcException(error.message)
    }
  }

  async update(id: number, updateFlightDto: UpdateFlightDto) {
    await this.findOne(id);
    const { id: ___, ...data } = updateFlightDto;
    return this.flight.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.flight.update({
      where: { id },
      data: { status: 2 },
    });
  }

  async validateFlights(ids: number[]) {
    ids = Array.from(new Set(ids));

    const flights = await this.flight.findMany({
      where: {
        id: {
          in: ids
        },
        availableSeats: {
          gt: 0
        }
      }
    });

    if (ids.length !== flights.length) {
      throw new RpcException({
        message: 'Some flights were not found',
        status: HttpStatus.BAD_REQUEST
      });
    }

    return flights;
  }

  async updateFlightSeats(data: UpdateSeatsDto) {

    const flights = await this.flight.updateMany({
      where: {
        id: {
          in: data.ids
        }
      },
      data: {
        availableSeats: {
          decrement: data.seats
        }
      },
    });

    return flights;
  }

}
