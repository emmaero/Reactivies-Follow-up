using System;
using AutoMapper;
using Domain;

namespace Application.Core;

public class MappingProfiles:Profile
{
    public MappingProfiles()
    {
        CreateMap<Activity, Activity>();
        CreateMap<Activity, Activity>().ReverseMap();
        // Add more mappings as needed
    }
}
