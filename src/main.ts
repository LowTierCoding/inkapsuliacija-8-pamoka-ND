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
console.group('1. Sukurkite Person klasei savybes "name" ir "surname". Kiekvienai i?? j?? sukurkite setterius, ir bendr?? getter?? fullname');
{
  
const fullname: string[] = people.map((p) => p.getFullname());

console.log(fullname);
}
console.groupEnd();

console.group('2. Sukurkite Person klasei savyb?? "age". Inkapsuliuokite ??i?? savyb?? taip, jog reik??m?? gal??t?? b??ti tik sveiki skai??iai nuo 1 iki 150');
{
const ages = people.map(p => p.getAge());
console.log('ages', ages);
}
console.groupEnd();

console.group('3. Sukurkite Person klasei savyb?? "height" kurios vert?? b??t?? saugoma centimetrais. Sukurkite ??iai savybei setter??, kuris pirmu parametru priimt?? reik??m??, o antru parametru priimt?? matavimo vienetus: "cm" | "m" | "in". Jeigu antras parametras n??ra perduotas, numatytas(default) matavimo vienetas turi b??ti cm. Getteris turi gr????inti reik??m?? centimetrais.');
{
const heights = people.map(p => p.getHeight());
console.log('heights', heights);
}
console.groupEnd();

console.group('4. Sukurkite Person klasei statin?? savyb?? "heightUnits". Jos tipas turi b??ti i??vardinimas(enum), kurio pasirinkimai yra: "cm", "m", "in". Numatytoji(default) "heightUnits" reik??m?? turi b??ti centimetrai');
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

console.group('5. "height" setterio antram parametrui pakeiskite s??jungos tip?? ?? [4.] u??duotyje sukurt?? i??vardinim??(enum). Priderinkite pavyzd??ius ir metod??.');

console.group('6. "height" geteriui sukurkite logik??, jog jis gr????int?? matavimo vienetus, pagal statin??s savyb??s "heightUnits" reik??m??.');
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

console.group('7. Analogi??kai pagal [4.]-[6.] punktus sukurkite savyb?? weight su statiniu i??vardinimu "weightUnits", kurio pasirinkimai turi b??ti: "KG", "LBS"');
{
const person2: Person = new Person(' Serbentautas', 'Bordiuras', 23, 189, 75);
console.log(person2);
console.log('WeightUnits', Person.weightUnits);
console.log('PersonWeight', person2.getWeight());
}
console.groupEnd();

console.group('8. Sukurkite klasei Person metod?? "toString". Kuris paverst?? ??mogaus savybes gra??iu formatu: vardas ir pavard?? pirmoje eilut??je, o "height" ir "weight" savyb??s atskirose eilut??se, atitrauktos nuo kairio kra??to per "tab" simbol??, ir su matavimo vienetais(kurie i??saugoti) statin??se Person klas??s savyb??se');

{
  const person3: Person = new Person(' Belekoks', 'Veikejas', 33, 200, 90);

Person.heightUnits = HeightUnits.METERS;
Person.weightUnits = WeightUnits.KG;
console.log('person3', person3.toString());

Person.heightUnits = HeightUnits.INCHES;
Person.weightUnits = WeightUnits.LBS;
console.log('person3', person3.toString());
}
