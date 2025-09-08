import { useParams } from "react-router-dom";
import Hero from "../components/About/Hero";
import UndoButton from "../components/UndoButton";
import React from "react";
import { getTeamMembers } from "../Api";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const heroBg = "https://res.cloudinary.com/dvadtratp/image/upload/v1747327037/bestpointgh/eunqurz5ywlilv9qris7.png";

export default function AboutDetails() {
  const { id } = useParams();
  const [teams, setTeams] = useState({
    management: [],
    shareholders: [],
    BOD: []
  });
  const [loading, setLoading] = useState(true);
  const [teamMember, setTeamMember] = useState(null);

  const fetchTeams = async () => {
    try {
      setLoading(true);
      const res = await getTeamMembers();
      
      // Transform the API data into our desired structure
      const transformedData = {
        management: res.data.filter(member => member.category === "management"),
        shareholders: res.data.filter(member => member.category === "shareholders"),
        BOD: res.data.filter(member => member.category === "board of directors")
      };
      
      setTeams(transformedData);
      
      // Find the team member
      const member = 
        transformedData.management.find(a => a.id === parseInt(id)) ||
        transformedData.BOD.find(a => a.id === parseInt(id)) ||
        transformedData.shareholders.find(a => a.id === parseInt(id));
      
      setTeamMember(member);
    } catch (err) {
      toast.error("Failed to fetch team member details");
      setTeams({
        management: [],
        shareholders: [],
        BOD: []
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeams();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple"></div>
      </div>
    );
  }

  if (!teamMember) {
    return <div className="p-6 text-red-500">Personality not found.</div>;
  }

  return (
    <div className="">
      <Hero image={heroBg} text1={"About Us"} />

      <div className="flex gap-x-4 lg:gap-x-12 items-center justify-start mt-12 ">
        <div className="bg-purple h-8 w-12 mb-2" />
        <>
          <UndoButton />
          <h1 className="text-3xl md:text-3xl font-bold text-gray-800 leading-tight">
            {teamMember.name}
          </h1>
        </>
      </div>

      <div className="pl-4 md:pl-24 sm:px-8 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-8 md:h-[500px]">
          <div className="col-span-2 p-6">
            <div className="rounded-3xl w-full h-[300px] md:h-[420px] overflow-hidden">
              {teamMember.image_url && (
                <img
                  src={teamMember.image_url}
                  className="w-full h-full object-fit md:object-cover rounded-3xl"
                  alt={teamMember.name}
                />
              )}
            </div>
          </div>
          <div className="col-span-5 space-y-2 p-2">
            <div className="flex flex-col bg-purple-200 rounded-3xl w-max">
              <span className="text-white font-open-sans text-xs px-2 py-1">
                Position: {teamMember.position}
              </span>
            </div>
            <div className="flex flex-col bg-purple rounded-3xl w-max">
              <span className="text-white text-xs px-2 py-1">Profile</span>
            </div>
            <p className="text-sm font-light font-open-sans text-justify md:text-left p-2">
              {teamMember.biography || "No biography available"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}