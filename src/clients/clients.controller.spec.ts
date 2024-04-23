import { Test, TestingModule } from '@nestjs/testing';
import { ClientsController } from './controllers/clients.controller';
import { ClientsService } from './clients.service';

describe('ClientsController', () => {
  let controller: ClientsController;

  const clients = [{
      id: "1",
      name: "Maria",
      last_name: "Gomez",
      email: "maria@gmail.com",
      photo_url: "wwww.fotico.com/maria",
      phone_number: "+57 3109876543",
      password: "Maria123*"
    },
    {
      id: "2",
      name: "Pedro",
      last_name: "Lopez",
      email: "pedro@gmail.com",
      photo_url: "wwww.fotico.com/pedro",
      phone_number: "+57 3158765432",
      password: "Pedro456*"
    },
    {
      id: "3",
      name: "Laura",
      last_name: "Martinez",
      email: "laura@gmail.com",
      photo_url: "wwww.fotico.com/laura",
      phone_number: "+57 3187654321",
      password: "Laura789*"
  }]

  const mockClientsService = {

    create: jest.fn((dto) => ({id: Math.floor(Math.random() * 100), ...dto})), 
    update: jest.fn((id, dto) => ({id, ...dto})), 
    remove: jest.fn((id) => ({}) ),
    findOne: jest.fn((id) =>(
      {
        id: "1",
        name: "Maria",
        last_name: "Gomez",
        email: "maria@gmail.com",
        photo_url: "wwww.fotico.com/maria",
        phone_number: "+57 3109876543",
        password: "Maria123*"
      }
    ) ),
    findAll: jest.fn(() => (clients))
    
  }
  
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClientsController],
      providers: [ClientsService ],
    })
    .overrideProvider(ClientsService)
    .useValue(mockClientsService)
    .compile();

    controller = module.get<ClientsController>(ClientsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a client', () => {
    const dto = {
      name: "Juan Jose", 
      last_name: "Diaz Parra",
      email: "juan@gmail.com", 
      photo_url: "wwww.fotico.com/juanjose",
      phone_number: "+57 3121234567",
      password: "Secreto123*"
    }

    // console.log(controller.create(dto))

    expect(mockClientsService.create(dto)).toEqual({
      id: expect.any(Number), 
      name: "Juan Jose", 
      last_name: "Diaz Parra",
      email: "juan@gmail.com", 
      photo_url: "wwww.fotico.com/juanjose",
      phone_number: "+57 3121234567",
      password: "Secreto123*"
    })

    expect(mockClientsService.create).toHaveBeenCalledWith(dto);
    expect(mockClientsService.create).toHaveBeenCalledTimes(1);

  })

  it('should update a client', () => {
    const dto = {
      name: "Juan Jose", 
      last_name: "Diaz Parra",
      email: "juan@gmail.com", 
      photo_url: "wwww.fotico.com/juanjose",
      phone_number: "+57 3121234567",
      password: "Secreto123*"
    }
    
    expect(controller.update('1', dto)).toEqual({id: '1', ...dto});
    expect(mockClientsService.update).toHaveBeenCalledWith('1', dto);
    expect(mockClientsService.update).toHaveBeenCalledTimes(1);

  })
  
  it('should delete a client', () => {
    
    expect(controller.remove('1')).toEqual({});
    expect(mockClientsService.remove).toHaveBeenCalledWith('1');
    expect(mockClientsService.remove).toHaveBeenCalledTimes(1);

  })


  it('should find a client', () =>  {
    const dto = {
      id: "1",
      name: "Maria",
      last_name: "Gomez",
      email: "maria@gmail.com",
      photo_url: "wwww.fotico.com/maria",
      phone_number: "+57 3109876543",
      password: "Maria123*"
  }   
    expect(controller.findOne('1')).toEqual(dto);
    expect(mockClientsService.findOne).toHaveBeenCalledWith('1');
    expect(mockClientsService.findOne).toHaveBeenCalledTimes(1);
  })

  it('should retrieve all', () => {
    expect(controller.findAll()).toEqual(clients);
    expect(mockClientsService.findAll).toHaveBeenCalledTimes(1);
  })
});
