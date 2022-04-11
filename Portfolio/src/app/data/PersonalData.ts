export interface PersonalData {
    name: string;
    backImage: string;
    image: string;
    position: string;
    company: {
      name: string;
      img: string;
      url: string; 
    },
    school: {
      name: string;
      img: string;
      url: string;
    },
    ubication: string;
}