import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/authOptions";
import { getExp } from "../../../../modules/services/seeker_exp_service";
import { getEdu } from "../../../../modules/services/seeker_edu_service";
import { getLan } from "../../../../modules/services/seeker_lan_service";
import { getSkill } from "../../../../modules/services/seeker_skill_service";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const seekerId = searchParams.get("id");

  try {
    const seekerResponse = await fetch(
      `https://myjobs.dev/seeker/v1/Seekers/${seekerId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const getExpData = await getExp(`?$filter=SeekerId eq ${seekerId}`);
    const getEduData = await getEdu(`?$filter=SeekerId eq ${seekerId}`);
    const getLanData = await getLan(`?$filter=SeekerId eq ${seekerId}`);
    const getSkillData = await getSkill(`?$filter=SeekerId eq ${seekerId}`);

    if (!seekerResponse.ok) {
      return new Response(
        JSON.stringify({ error: `Error: ${seekerResponse.status}` }),
        { status: seekerResponse.status }
      );
    }

    const seekerData = await seekerResponse.json();

    return NextResponse.json({
      seekerData: seekerData,
      expData: getExpData?.value,
      eduData: getEduData?.value,
      lanData: getLanData?.value,
      skillData: getSkillData?.value,
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
