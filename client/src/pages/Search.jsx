import { useState } from "react";
import SearchCard from "../components/SearchCard";

export default function Search() {

  const [category, setCategory] = useState("mentors");
  const [faculty, setFaculty] = useState("");
  const [industry, setIndustry] = useState("");
  const [type, setType] = useState("");
  const [search, setSearch] = useState("");


  const data = {

    mentors: [
      {
        name: "Sarah Johnson",
        role: "Frontend Developer",
        faculty: "Computing",
        industry: "Software Engineering",
        type: "Professional"
      },
      {
        name: "David Perera",
        role: "Backend Engineer",
        faculty: "Technology",
        industry: "IT",
        type: "Academic"
      }
    ],


    students: [
      {
        name: "John Silva",
        role: "ICT Undergraduate",
        faculty: "Computing",
        industry: "Software Engineering",
        type: "Student"
      }
    ],


    programs: [
      {
        name: "Web Development Mentorship",
        role: "6 Month Program",
        faculty: "Computing",
        industry: "Software Engineering",
        type: "Program"
      }
    ],


    opportunities: [
      {
        name: "Software Internship",
        role: "Internship Opportunity",
        faculty: "Technology",
        industry: "IT",
        type: "Opportunity"
      }
    ]

  };


  const results = data[category].filter((item)=>{

    return (

      item.name.toLowerCase().includes(search.toLowerCase())

      &&

      (faculty === "" || item.faculty === faculty)

      &&

      (industry === "" || item.industry === industry)

      &&

      (type === "" || item.type === type)

    );

  });



  return (

    <div className="min-h-screen bg-[#120818] text-white p-10">


      <h1 className="text-4xl font-bold text-center text-purple-200 mb-10">
        Search
      </h1>


      <div className="max-w-4xl mx-auto bg-[#1A0F24] p-8 rounded-2xl border border-[#6B116E]">


        <input

          value={search}

          onChange={(e)=>setSearch(e.target.value)}

          placeholder="Search..."

          className="w-full p-3 rounded-lg bg-[#120818] border border-purple-500"

        />



        <select

          value={category}

          onChange={(e)=>setCategory(e.target.value)}

          className="w-full mt-5 p-3 rounded-lg bg-[#120818] border border-purple-500"

        >

          <option value="mentors">Mentors</option>
          <option value="students">Students</option>
          <option value="programs">Programs</option>
          <option value="opportunities">Opportunities</option>


        </select>



        <select

          value={faculty}

          onChange={(e)=>setFaculty(e.target.value)}

          className="w-full mt-5 p-3 rounded-lg bg-[#120818] border border-purple-500"

        >

          <option value="">All Faculties</option>
          <option>Computing</option>
          <option>Technology</option>
          <option>Engineering</option>
          <option>Medical Sciences</option>

        </select>



        <select

          value={industry}

          onChange={(e)=>setIndustry(e.target.value)}

          className="w-full mt-5 p-3 rounded-lg bg-[#120818] border border-purple-500"

        >

          <option value="">All Industries</option>
          <option>Software Engineering</option>
          <option>IT</option>

        </select>


                <select

          value={type}

          onChange={(e)=>setType(e.target.value)}

          className="w-full mt-5 p-3 rounded-lg bg-[#120818] border border-purple-500"

        >

          <option value="">All Types</option>
          <option>Professional</option>
          <option>Academic</option>
          <option>Student</option>
          <option>Program</option>
          <option>Opportunity</option>

        </select>



      </div>



      <div className="grid md:grid-cols-3 gap-6 mt-10">


       {results.map((item, index) => (
          <SearchCard
           key={index}
           item={item}
         />
        ))}

      </div>



    </div>

  );

}