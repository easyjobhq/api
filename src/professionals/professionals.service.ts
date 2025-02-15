import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateProfessionalDto } from './dto/create-professional.dto';
import { UpdateProfessionalDto } from './dto/update-professional.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Professional } from './entities/professional.entity';
import { Repository } from 'typeorm';
import { isUUID } from 'class-validator';
import { Service } from './entities/service.entity';
import { ServiceService } from './service.service';
import { Speciality } from './entities/speciality.entity';
import { SpecialityService } from './speciality.service';
import { City } from "../general_resources/entities/city.entity";
import { LanguageService } from '../general_resources/services/language.service';
import { CityService } from '../general_resources/services/city.service';
import { Appointment } from '../client_professional_entities/entities/appointment.entity';
import { S3Service } from 'src/s3/s3.service';
//Never delete this import!!!!!
import { Express } from 'express';
import { Review } from '../client_professional_entities/entities/review.entity';
import { Place } from './entities/place.entity';
import { CreatePlaceDTO } from './dto/create-place.dto';

@Injectable()
export class ProfessionalsService {

  private readonly logger = new Logger('ProfessionalService');


  constructor(
    @InjectRepository(Professional)
    private readonly professionalRepository: Repository<Professional>,
    @InjectRepository(Service)
    private readonly serviceRepository: Repository<Service>,
    @InjectRepository(Speciality)
    private readonly specialityRepository: Repository<Speciality>,
    @InjectRepository(City)
    private readonly CityRepository: Repository<City>,
    @InjectRepository(Appointment)
    private readonly AppoimentRepository: Repository<Appointment>,
    @InjectRepository(Place)
    private readonly PlaceRepository: Repository<Place>,
    private readonly serviceService: ServiceService,
    private readonly specialityService: SpecialityService,
    private readonly languageService: LanguageService,
    private readonly cityService: CityService,
    private s3Service: S3Service
  ) { }

  async create(createProfessionalDto: CreateProfessionalDto, professionalPhoto: Express.Multer.File) {

    //Uploading the file to S3
    const photoUrl = await this.s3Service.uploadFile(professionalPhoto, professionalPhoto.originalname);

    const professional = this.professionalRepository.create(createProfessionalDto);
    professional.photo_url = photoUrl

    const service = await this.serviceService.findOne(createProfessionalDto.service_id);
    const language = await this.languageService.findOne(createProfessionalDto.language_id);
    const city = await this.cityService.findOne(createProfessionalDto.city_id);
    const speciality = await this.specialityService.findOne(createProfessionalDto.speciality_id);

    const {latitude, longitude} = createProfessionalDto;

    const createplace = new CreatePlaceDTO();
    createplace.latitude = latitude;
    createplace.longitude = longitude;
    createplace.name = ''

    const place = this.PlaceRepository.create(createplace);

    

    professional.services = professional.services || [];
    professional.languages = professional.languages || [];
    professional.cities = professional.cities || [];
    professional.specialities = professional.specialities || [];
    professional.places = professional.places || [];

    if (service) professional.services.push(service);
    if (language) professional.languages.push(language);
    if (city) professional.cities.push(city);
    if (speciality) professional.specialities.push(speciality);
    if (place) professional.places.push(place);
    professional.score = "0"

    await this.professionalRepository.save(professional);

    return professional;
  }

  async saveProfessional(profesional: Professional) {
    try {
      await this.professionalRepository.save(profesional);
      return profesional;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findProfessionalsBySpeciality(speciality_name: string) {
    const professionals = await this.professionalRepository.find({
      where: {
        specialities: {
          speciality_name: speciality_name
        }
      },
      relations: ['specialities', 'places']
    });

    return professionals;

  }

  async findAll(limit: number, offset: number): Promise<[Professional[], number]> {
    const [results, total] = await this.professionalRepository.findAndCount({
      skip: offset,
      take: limit,
      relations: ['cities', 'specialities', 'services', 'places']
    });
    return [results, total];
  }


  async findByCityAndSpeciality(cityName: string, specialityName: string, limit: number, offset: number): Promise<[Professional[], number]> {
    const [results, total] = await this.professionalRepository.findAndCount({
      where: {
        cities: {
          city_name: cityName
        },
        specialities: {
          speciality_name: specialityName
        }
      },
      relations: ['cities', 'specialities', 'services', 'places'],
      skip: offset,
      take: limit
    });

    return [results, total];
  }

  async findOne(id_professional: string) {

    let professional: Professional;

    professional = await this.professionalRepository.findOne({
      where: { id: id_professional },
      relations: ['cities', 'specialities', 'services', 'questions', 'reviews', 'places'], // Include the cities relation here
    });

    if (!professional) {
      throw new NotFoundException(`Professional with ${id_professional} not found`)
    }

    return professional;

  }

  async findOneNoRelationships(id_professional: string) {


    if (!id_professional) {
      return null;
    }

    let professional: Professional;

    professional = await this.professionalRepository.findOne({
      where: { id: id_professional }
    });

    if (!professional) {
      throw new NotFoundException(`Professional with ${id_professional} not found`)
    }

    return professional;

  }

  async addServiceToProfessional(id_professional: string, id_service: string) {
    let professional: Professional;
    let service: Service;

    professional = await this.findOne(id_professional);
    if (!professional) {
      throw new NotFoundException('professional not found')
    }
    service = await this.serviceService.findOne(id_service);

    if (!service) {
      throw new NotFoundException('services not found')
    }

    const services = await this.findServices(id_professional)


    if (!professional.services)
      professional.services = []



    professional.services.push(...services);
    professional.services.push(service)


    await this.professionalRepository.save(professional)

    return professional;

  }

  async DeleteServiceToProfessional(id_professional: string, id_service: string) {
    let professional: Professional;
    let service: Service;

    professional = await this.professionalRepository.findOne({ where: { id: id_professional }, relations: ['services'] });
    if (!professional) {
      throw new NotFoundException('professional not found')
    }
    service = await this.serviceService.findOne(id_service);

    if (!service) {
      throw new NotFoundException('services not found')
    }

    professional.services = professional.services.filter(s => s.id !== id_service);

    await this.professionalRepository.save(professional);

  }

  async DeleteSpecialityToProfessional(id_professional: string, id_speciality: string) {
    let professional: Professional;
    let speciality: Speciality;

    professional = await this.professionalRepository.findOne({ where: { id: id_professional }, relations: ['specialities'] });
    if (!professional) {
      throw new NotFoundException('professional not found')
    }
    speciality = await this.specialityService.findOne(id_speciality);

    if (!speciality) {
      throw new NotFoundException('services not found')
    }

    console.log(speciality.id)

    professional.specialities = professional.specialities.filter(s => s.id !== id_speciality);

    await this.professionalRepository.save(professional);

  }

  async addSpecialityToProfessional(id_professional: string, id_speciality: string) {
    let professional: Professional;
    let speciality: Speciality;

    if (isUUID(id_professional) && isUUID(id_speciality)) {
      professional = await this.findOne(id_professional);
      speciality = await this.specialityService.findOne(id_speciality);
    }

    const specialities = await this.findSpecialities(id_professional)

    if (!professional.specialities)
      professional.specialities = []

    professional.specialities.push(...specialities)
    professional.specialities.push(speciality);

    await this.professionalRepository.save(professional)

    return professional.services
  }

  async addCityToProfessional(id_professional: string, id_city: string) {
    let professional: Professional;
    let city: City;

    if (isUUID(id_professional) && isUUID(id_city)) {
      professional = await this.findOne(id_professional);
      city = await this.CityRepository.findOneBy({ id: id_city });
    }

    const cities = await this.findCities(id_professional);
    if (!professional.cities)
      professional.cities = []

    professional.cities.push(...cities);
    professional.cities.push(city);

    await this.professionalRepository.save(professional)

    return professional;
  }



  async findServices(id_professional: string) {
    return await this.serviceRepository.createQueryBuilder('service')
      .innerJoin("service.professionals", "professional")
      .where("professional.id = :id", { id: id_professional })
      .getMany()
  }

  async findSpecialities(id_professional: string) {
    return await this.specialityRepository.createQueryBuilder('speciality')
      .innerJoin('speciality.professionals', 'professional')
      .where('professional.id = :id', { id: id_professional })
      .getMany()
  }

  async findAppoiments(id_professional: string) {

    const professional = await this.findOne(id_professional);


    const appointments = this.AppoimentRepository.find({
      where: {
        professional: professional
      },
      relations: ['client', 'professional', 'service', 'appointmentStatus']
    });

    return appointments

  }

  async findByCity(city_name: string) {
    return await this.professionalRepository
      .createQueryBuilder('professional')
      .innerJoin('professional.cities', 'city')
      .where('city.city_name = :name', { name: city_name })
      .getMany()
  }

  async findCities(id_professional: string) {
    return await this.CityRepository
      .createQueryBuilder('city')
      .innerJoin('city.professionals', 'professional')
      .where('professional.id = :id', { id: id_professional })
      .getMany();
  }

  async findOneByEmail(email_professional: string): Promise<Professional> {
    let professional: Professional;
    professional = await this.professionalRepository.findOneBy({ email: email_professional })
    return professional;
  }

  async update(id: string, updateProfessionalDto: UpdateProfessionalDto, professionalPhoto: Express.Multer.File) {

    const professional = await this.professionalRepository.preload({
      id: id,
      ...updateProfessionalDto
    });

    if (!professional) throw new NotFoundException(`Professional with id: ${id} not found`);

    try {

      if (professionalPhoto) {
        //Uploading the file to S3
        const photoUrl = await this.s3Service.uploadFile(professionalPhoto, professionalPhoto.originalname);
        professional.photo_url = photoUrl;
      }

      await this.professionalRepository.save(professional);
      return professional;

    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async remove(id: string) {
    const professional = await this.findOne(id);
    await this.professionalRepository.remove(professional);
  }


  private handleDBExceptions(error: any) {

    if (error.code === '23505')
      throw new BadRequestException(error.detail);

    this.logger.error(error)
    // console.log(error)
    throw new InternalServerErrorException('Unexpected error, check server logs');

  }

  async getTotalReviews(professional_id: string) {
    const professionalReviews = await this.professionalRepository.findOne({
      where: { id: professional_id },
      relations: ['reviews']
    });

    const reviews: Review[] = professionalReviews.reviews;

    if (reviews.length === 0) {
      return 0;
    }

    let score: number = 0;
    reviews.forEach(review => {
      score += review.score;
    });

    const amountReviews = reviews.length;
    const result = score / amountReviews;

    return parseFloat(result.toFixed(1));
  }
}
