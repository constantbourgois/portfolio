"use client";
import './projetsstyle.scss';
import Image from 'next/image';
import Dataprojets from './dataprojets.json' assert { type: "json" };
import { useEffect, useState } from 'react';

interface Projet {
    nom?: string;
    type?: string; // Made optional
    description?: string;
    skills?: string[];
    lien?: string;
    image: string;
}
interface FilteredElements {
    skill: string;
    nom: string[];

}

export default function Projets() {
    const [displayedSkills, setDisplayedSkills] = useState<FilteredElements[]>([]);
    const [listProjets, setListProjets] = useState<Projet[]>([]);
    const [selectedSkill, setSelectedSkill] = useState("");
    const [toutesSelected, setToutesSelected] = useState(true);

   
function updateProjetList(selectedNames: FilteredElements) {
   setToutesSelected(false);
   setSelectedSkill(selectedNames.skill);
    const updatedList = Dataprojets.filter((Dataprojet) =>
        selectedNames.nom.includes(Dataprojet.nom || "")
    );
    setListProjets(updatedList);
}

function selectToutesSkills (){
    setToutesSelected(true);
    setListProjets(Dataprojets);
    setSelectedSkill("");
}

useEffect(() => {
    if (!listProjets.length){
        setListProjets(Dataprojets);
    }
   
    const filteredElements: FilteredElements [] = [];

    Dataprojets.forEach((projet: Projet) => {
        projet.skills?.forEach((skill: string) => {
           
                filteredElements.push( {
                    "skill": skill, "nom": [projet.nom || ""],
                });
           
        });
    });
    filteredElements.sort(
        (a,b) => a.skill.localeCompare(b.skill)
    );
    const newFiltered : FilteredElements [] = [];
    filteredElements.forEach((filteredElement, index:number)=>{
       
        if (filteredElements[index - 1] && filteredElement.skill === filteredElements[index - 1].skill){
            newFiltered[newFiltered.length -1].nom.push(filteredElement.nom[0]);
            newFiltered[newFiltered.length -1].skill = filteredElement.skill;

            //filteredElements.splice(index, 1);
        }
        else {
            newFiltered.push(filteredElement);
        }
    })
  
    setDisplayedSkills(newFiltered);
  
}, [listProjets.length])
    return (
        <div className="wrap-projet">
            <h2> Sélectionnez une compétence </h2>
            <div>
                <a className={`choose-skill ${toutesSelected ? 'toutes-button' : ''}`} onClick={() => selectToutesSkills() }>Toutes</a>
                {  displayedSkills.map( (displayedSkill, index) => (
                        <a  className={`choose-skill ${selectedSkill === displayedSkill.skill ? 'active-filter' : ''}`} onClick={() => updateProjetList(displayedSkill)} key={index}>{displayedSkill.skill + " (" + displayedSkill.nom.length + ")"}</a>
                ))  }
            </div>
            <div>
                {listProjets.map((projet: Projet, index) => (
                    <article key={index} className="desc-projet fade-slide-in">
                        <div className="wrap-article">
                            <div className="img-projet">
                                <Image className="max-w-32" src={projet.image} alt="fff" width={128} height={128} />
                            </div>
                            <div className="taches cache">{projet.description}</div>
                            <div className="lang cache">
                                <ul>
                                    {
                                        projet.skills?.map((skill, index) => (
                                            <li key={index}>{skill}</li>
                                        ))
                                    }
                                </ul>
                            </div>
                            <div className="nom-projet">{projet.nom}</div>
                            <div className="type-projet">{projet.type}</div>
                            <div><a target="_blank" href={projet.lien}>Lien</a></div>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    )
}
