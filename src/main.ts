enum HeightUnits {
  CENTIMETERS = 'cm',
  METERS = 'm',
  INCHES = 'in'
};

enum WeightUnits {
  KG = 'kg',
  LBS = 'lbs'
}

const capitalize = (word : string): string => {
  const words = word.trim().split(' ');
  const capitalizedWords = words.map(w => w[0].toUpperCase() + w.slice(1));
  return capitalizedWords.join(' ');
}

class Person {
  static heightUnits: HeightUnits = HeightUnits.CENTIMETERS;
  static weightUnits: WeightUnits = WeightUnits.KG;

  private name!: string;
  private surname!: string;
  private age!: number;
  private height!: number;
  private weight!: number;

  constructor(
    name: string, 
    surname: string, 
    age: number, 
    height: number,
    weight: number,
    weightUnits?: WeightUnits,
    heightUnits?: HeightUnits,
    ){
    this.setName(name);
    this.setSurname(surname);
    this.setAge(age);
    this.setHeight(height, heightUnits);
    this.setWeight(weight, weightUnits)
  }

  public setName(name:string){
    if(name === '') throw new Error('Negali buti tuscias');
    if(name.length < 2) throw new Error('Vardas turi buti bent is 2 raidziu');
    
    this.name = capitalize(name);
  }

  public setSurname(surname: string){
    if(surname === '') throw new Error('Negali buti tuscias');
    if(surname.length < 2) throw new Error('Pavarde turi buti bent is 2 raidziu');

    this.surname = capitalize(surname);
  }

  public setAge(age: number){
    if(age % 1 !== 0) throw new Error('Amzius turi buti sveikas skaicius');
    if(age < 1 ) throw new Error('Amzius negali buti mazesnis nei 1');
    if(age > 150 ) throw new Error('Amzius negali buti didesnis uz 150');

    this.age = age;
  }

  public setHeight(height: number, units: HeightUnits = HeightUnits.CENTIMETERS){
  switch(units){
    case HeightUnits.CENTIMETERS: this.height = height; break;
    case HeightUnits.METERS: this.height = height * 100; break;
    case HeightUnits.INCHES: this.height = height * 2.54; break;
    default: break;
  }
    
  }

public setWeight(weight: number, units: WeightUnits = WeightUnits.KG){
switch(units){
  case WeightUnits.KG: this.weight = weight; break;
  case WeightUnits.LBS: this.weight = weight / 0.45; break;
  default: break;
}

}

  public getFullname(){
    return `${this.name} ${this.surname}`
  }

  public getAge(): number {
    return this.age;
  }

  public getHeight(): number{
    switch(Person.heightUnits){
      case HeightUnits.CENTIMETERS: return this.height;
      case HeightUnits.METERS: return this.height / 100;
      case HeightUnits.INCHES: return this.height / 2.54;
      default: return this.height;
    }
    
  }

  public getWeight(): number{
    switch(Person.weightUnits){
      case WeightUnits.KG: return this.weight;
      case WeightUnits.LBS: return this.weight / 0.45;
      default: return this.weight;
    }
  }

  public toString(): string {
  let formattedPerson = `${this.name} ${this.surname}\n`;
  formattedPerson += `\theight: ${this.getHeight()} ${Person.heightUnits}\n`;
  formattedPerson += `\tweight: ${this.getWeight()} ${Person.weightUnits}\n`;

  return formattedPerson;
  }
}

const people: Person[] = [
    new Person(' Serbentautas', 'Bordiuras', 23, 189, 75, WeightUnits.KG, HeightUnits.METERS),
    new Person('varaloja ', 'karkse', 25, 1.7, 65, WeightUnits.LBS, HeightUnits.METERS),
    new Person('Suteivis mareivis', 'Kirvokas', 36, 196, 80, WeightUnits.KG, HeightUnits.INCHES),
  ];
console.group('1. Sukurkite Person klasei savybes "name" ir "surname". Kiekvienai iš jų sukurkite setterius, ir bendrą getterį fullname');
{
  
const fullname: string[] = people.map((p) => p.getFullname());

console.log(fullname);
}
console.groupEnd();

console.group('2. Sukurkite Person klasei savybę "age". Inkapsuliuokite šią savybę taip, jog reikšmė galėtų būti tik sveiki skaičiai nuo 1 iki 150');
{
const ages = people.map(p => p.getAge());
console.log('ages', ages);
}
console.groupEnd();

console.group('3. Sukurkite Person klasei savybę "height" kurios vertė būtų saugoma centimetrais. Sukurkite šiai savybei setterį, kuris pirmu parametru priimtų reikšmę, o antru parametru priimtų matavimo vienetus: "cm" | "m" | "in". Jeigu antras parametras nėra perduotas, numatytas(default) matavimo vienetas turi būti cm. Getteris turi grąžinti reikšmę centimetrais.');
{
const heights = people.map(p => p.getHeight());
console.log('heights', heights);
}
console.groupEnd();

console.group('4. Sukurkite Person klasei statinę savybę "heightUnits". Jos tipas turi būti išvardinimas(enum), kurio pasirinkimai yra: "cm", "m", "in". Numatytoji(default) "heightUnits" reikšmė turi būti centimetrai');
{
  console.log('Matavimo vienetai pakeisti i:');
  console.dir(Person.heightUnits);
  Person.heightUnits = HeightUnits.METERS;
  console.dir(Person.heightUnits);
  Person.heightUnits = HeightUnits.INCHES;
  console.dir(Person.heightUnits);
  Person.heightUnits = HeightUnits.CENTIMETERS;
  console.dir(Person.heightUnits);
}
console.groupEnd();

console.group('5. "height" setterio antram parametrui pakeiskite sąjungos tipą į [4.] užduotyje sukurtą išvardinimą(enum). Priderinkite pavyzdžius ir metodą.');

console.group('6. "height" geteriui sukurkite logiką, jog jis grąžintų matavimo vienetus, pagal statinės savybės "heightUnits" reikšmę.');
{

Person.heightUnits = HeightUnits.METERS;
const heightsInMeters = people.map(p => p.getHeight());
console.log('Matavimo vienetai pakeisti i: ', HeightUnits.METERS);
console.log(heightsInMeters);

Person.heightUnits = HeightUnits.INCHES;
const heightsInInches = people.map(p => p.getHeight());
console.log('Matavimo vienatai pakeisti i: ', HeightUnits.INCHES);
console.log(heightsInInches);

Person.heightUnits = HeightUnits.CENTIMETERS;
const heightInCentimeters = people.map(p => p.getHeight());
console.log('Matavimo vienetai pakeisti i: ', HeightUnits.CENTIMETERS);
console.log(heightInCentimeters);
}
console.groupEnd();

console.group('7. Analogiškai pagal [4.]-[6.] punktus sukurkite savybę weight su statiniu išvardinimu "weightUnits", kurio pasirinkimai turi būti: "KG", "LBS"');
{
const person2: Person = new Person(' Serbentautas', 'Bordiuras', 23, 189, 75);
console.log(person2);
console.log('WeightUnits', Person.weightUnits);
console.log('PersonWeight', person2.getWeight());
}
console.groupEnd();

console.group('8. Sukurkite klasei Person metodą "toString". Kuris paverstų žmogaus savybes gražiu formatu: vardas ir pavardė pirmoje eilutėje, o "height" ir "weight" savybės atskirose eilutėse, atitrauktos nuo kairio krašto per "tab" simbolį, ir su matavimo vienetais(kurie išsaugoti) statinėse Person klasės savybėse');

{
  const person3: Person = new Person(' Belekoks', 'Veikejas', 33, 200, 90);

Person.heightUnits = HeightUnits.METERS;
Person.weightUnits = WeightUnits.KG;
console.log('person3', person3.toString());

Person.heightUnits = HeightUnits.INCHES;
Person.weightUnits = WeightUnits.LBS;
console.log('person3', person3.toString());
}
