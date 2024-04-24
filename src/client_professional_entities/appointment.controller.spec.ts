import { Test, TestingModule } from '@nestjs/testing';;
import { AppointmentService } from './appointment.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Appointment } from './entities/appointment.entity';
import { AppointmentController } from './controllers/appointment.controller';

describe('AppointmentController', () => {
  let controller: AppointmentController;

  const appointments = [
    {
      id: "1",
      date: 1621436400000, // May 19, 2021
      location: "POINT (10 20)",
      client: { id: "1" },
      professional: { id: "1" },
      payment_method: { id: "1" }
    },
    {
      id: "2",
      date: 1621436400000, // May 19, 2021
      location: "POINT (10 20)",
      client: { id: "2" },
      professional: { id: "2" },
      payment_method: { id: "2" }
    }
  ];

  const mockAppointmentService = {
    create: jest.fn((id1, id2, dto) => ({ id: Math.floor(Math.random() * 100), ...dto })),
    findAll: jest.fn(() => appointments),
    findOne: jest.fn((id) => appointments.find(appointment => appointment.id === id)),
    remove: jest.fn((id) => ({}))
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppointmentController],
      providers: [{ provide: AppointmentService, useValue: mockAppointmentService }],
    }).compile();

    controller  = module.get<AppointmentController>(AppointmentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create an appointment', () => {
    const dto = {
      date: 1621436400000, // May 19, 2021
      location: "POINT (10 20)",
      client: undefined,
      professional: undefined,
      payment_method: undefined
    };

    expect(controller.create(dto, "589e70e6-1b82-4fd4-ae25-29c226fa88b1", "589e70e6-1b82-4fd4-ae25-29c226fa88b1")).toEqual({ id: expect.any(Number), ...dto });
    expect(mockAppointmentService.create).toHaveBeenCalledWith("589e70e6-1b82-4fd4-ae25-29c226fa88b1", "589e70e6-1b82-4fd4-ae25-29c226fa88b1", dto);
    expect(mockAppointmentService.create).toHaveBeenCalledTimes(1);
  });

  it('should find all appointments', () => {
    expect(controller.findAll()).toEqual(appointments);
    expect(mockAppointmentService.findAll).toHaveBeenCalledTimes(1);
  });

  it('should find an appointment by id', () => {
    const appointmentId = "1";
    expect(controller.findOne(appointmentId)).toEqual(appointments[0]);
    expect(mockAppointmentService.findOne).toHaveBeenCalledWith(appointmentId);
    expect(mockAppointmentService.findOne).toHaveBeenCalledTimes(1);
  });


  it('should remove an appointment', () => {
    const appointmentId = "1";
    expect(controller.remove(appointmentId)).toEqual({});
    expect(mockAppointmentService.remove).toHaveBeenCalledWith(appointmentId);
    expect(mockAppointmentService.remove).toHaveBeenCalledTimes(1);
  });
});
