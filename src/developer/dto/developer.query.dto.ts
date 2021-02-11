export class DeveloperWhereDto {
  name: string;
  gender: string;
  age: number;
  hobby: string;
  birthdate: Date;
}

export class DeveloperQueryDto extends DeveloperWhereDto {
  page: number;
  limit: number;
}
