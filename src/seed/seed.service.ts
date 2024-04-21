import { Injectable } from '@nestjs/common';
import { CreateSeedDto } from './dto/create-seed.dto';
import { UpdateSeedDto } from './dto/update-seed.dto';
import { DataSource } from 'typeorm';
import { Department } from '../general_resources/entities/department.entity';
import { City } from '../general_resources/entities/city.entity';
import { Language } from '../general_resources/entities/language.entity';
import { Professional } from '../professionals/entities/professional.entity';
import { Role } from '../auth/entities/role.enum';

@Injectable()
export class SeedService {
  constructor(private readonly datasource: DataSource){}


  async seed() {
    const queryRunner = this.datasource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try{
      const departmentRepository = queryRunner.manager.getRepository(Department);
      const cityRepository = queryRunner.manager.getRepository(City);
      const languageRepository = queryRunner.manager.getRepository(Language);
      const professionalRepository = queryRunner.manager.getRepository(Professional)

      
      const cities = await cityRepository.find();
      await cityRepository.remove(cities);
      const departments = await departmentRepository.find();
      await departmentRepository.remove(departments)
      const languages = await languageRepository.find();
      await languageRepository.remove(languages);
      const professionals = await professionalRepository.find()
      await professionalRepository.remove(professionals);
      
      const deparm1 = departmentRepository.create({ department_name: "Amazonas" });
      const deparm2 = departmentRepository.create({ department_name: "Antioquia" });
      const deparm3 = departmentRepository.create({ department_name: "Arauca" });
      const deparm4 = departmentRepository.create({ department_name: "Atlántico" });
      const deparm5 = departmentRepository.create({ department_name: "Bolívar" });
      const deparm6 = departmentRepository.create({ department_name: "Boyacá" });
      const deparm7 = departmentRepository.create({ department_name: "Caldas" });
      const deparm8 = departmentRepository.create({ department_name: "Caquetá" });
      const deparm9 = departmentRepository.create({ department_name: "Casanare" });
      const deparm10 = departmentRepository.create({ department_name: "Cauca" });
      const deparm11 = departmentRepository.create({ department_name: "Cesar" });
      const deparm12 = departmentRepository.create({ department_name: "Chocó" });
      const deparm13 = departmentRepository.create({ department_name: "Córdoba" });
      const deparm14 = departmentRepository.create({ department_name: "Cundinamarca" });
      const deparm15 = departmentRepository.create({ department_name: "Guainía" });
      const deparm16 = departmentRepository.create({ department_name: "Guaviare" });
      const deparm17 = departmentRepository.create({ department_name: "Huila" });
      const deparm18 = departmentRepository.create({ department_name: "La Guajira" });
      const deparm19 = departmentRepository.create({ department_name: "Magdalena" });
      const deparm20 = departmentRepository.create({ department_name: "Meta" });
      const deparm21 = departmentRepository.create({ department_name: "Nariño" });
      const deparm22 = departmentRepository.create({ department_name: "Norte de Santander" });
      const deparm23 = departmentRepository.create({ department_name: "Putumayo" });
      const deparm24 = departmentRepository.create({ department_name: "Quindío" });
      const deparm25 = departmentRepository.create({ department_name: "Risaralda" });
      const deparm26 = departmentRepository.create({ department_name: "San Andrés y Providencia" });
      const deparm27 = departmentRepository.create({ department_name: "Santander" });
      const deparm28 = departmentRepository.create({ department_name: "Sucre" });
      const deparm29 = departmentRepository.create({ department_name: "Tolima" });
      const deparm30 = departmentRepository.create({ department_name: "Valle del Cauca" });
      const deparm31 = departmentRepository.create({ department_name: "Vaupés" });
      const deparm32 = departmentRepository.create({ department_name: "Vichada" });


      await departmentRepository.save([
        deparm1, deparm2, deparm3, deparm4, deparm5, deparm6, deparm7, deparm8, 
        deparm9, deparm10, deparm11, deparm12, deparm13, deparm14, deparm15, 
        deparm16, deparm17, deparm18, deparm19, deparm20, deparm21, deparm22, 
        deparm23, deparm24, deparm25, deparm26, deparm27, deparm28, deparm29, 
        deparm30, deparm31, deparm32
      ]);
      
      const city1 = cityRepository.create({ city_name: "Bogotá", department: deparm14 });
      const city2 = cityRepository.create({ city_name: "Medellín", department: deparm2 });
      const city3 = cityRepository.create({ city_name: "Cali", department: deparm30 });
      const city4 = cityRepository.create({ city_name: "Barranquilla", department: deparm8 });
      const city5 = cityRepository.create({ city_name: "Cartagena", department: deparm13 });
      const city6 = cityRepository.create({ city_name: "Cúcuta", department: deparm22 });
      const city7 = cityRepository.create({ city_name: "Bucaramanga", department: deparm20 });
      const city8 = cityRepository.create({ city_name: "Pereira", department: deparm25 });
      const city9 = cityRepository.create({ city_name: "Santa Marta", department: deparm19 });
      const city10 = cityRepository.create({ city_name: "Ibagué", department: deparm26 });
      const city11 = cityRepository.create({ city_name: "Villavicencio", department: deparm6 });
      const city12 = cityRepository.create({ city_name: "Pasto", department: deparm23 });


      await cityRepository.save([
        city1, city2, city3, city4, city5, city6, city7, city8, 
        city9, city10, city11, city12
      ]);
      
      const professionalData1= professionalRepository.create({
        name: "John",
        last_name: "Doe",
        email: "johndoe@example.com",
        phone_number: "123456789",
        photo_url: "https://example.com/profile.jpg",
        password: "Password.123",
        roles:[Role.Professional],
        score: "5.0",
        description: "Experienced professional with expertise in various fields.",
        languages:[]
        
      });

      const professionalData2 = professionalRepository.create({
        name: "Jane",
        last_name: "Smith",
        email: "janesmith@example.com",
        phone_number: "987654321",
        photo_url: "https://example.com/profile.jpg",
        password: "SecurePassword.123",
        roles:[Role.Professional],
        score: "4.5",
        description: "Dedicated professional with strong communication skills.",
        languages:[]
        
      });
    
      const professionalData3 = professionalRepository.create({
          name: "Michael",
          last_name: "Johnson",
          email: "michaeljohnson@example.com",
          phone_number: "555123456",
          photo_url: "https://example.com/profile.jpg",
          password: "StrongPassword.456",
          roles:[Role.Professional],
          score: "4.8",
          description: "Highly skilled professional with years of experience.",
          languages:[]
      });
   
      
      
      const language1 = languageRepository.create({language_name:'Spanish', professionals:[] });
      //language1.professionals.push(professionalData1,professionalData2);
      const language2 = languageRepository.create({language_name:'English' });
      const language3 = languageRepository.create({language_name:'French' });
      const language4 = languageRepository.create({language_name:'German', professionals:[] });
      //language4.professionals.push(professionalData3);
      const language5 = languageRepository.create({language_name:'Portuguese' });
      const language6 = languageRepository.create({language_name:'Italian', professionals:[] });
      //language6.professionals.push(professionalData1,professionalData3);
      
      await languageRepository.save([
        language1, language2, language3, language4, language5, language6
      ]);
      
      professionalData1.languages.push(language1,language6)
      professionalData2.languages.push(language1)
      
      professionalData3.languages.push(language4,language6)

      await professionalRepository.save([professionalData1, professionalData2, professionalData3]);

      await queryRunner.commitTransaction();

    }catch(error){
      await queryRunner.rollbackTransaction();
      throw error;
    }finally {
      await queryRunner.release();
      return 'The seeder was succesful';
    }

    
  }
}
