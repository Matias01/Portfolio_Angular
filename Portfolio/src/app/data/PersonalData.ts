import { Company } from "./Company";
import { School } from "./School";

export interface PersonalData {
    id: number;
    name: string;
    backImage: string;
    image: string;
    position: string;
    company: Company;
    school: School;
    facebook: string;
    twitter: string;
    instagram: string;
    ubication: string;
    about: string;
}