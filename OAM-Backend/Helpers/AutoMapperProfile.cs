using AutoMapper;
using OAM_Backend.Models;
using OAM_Backend.Models.Requests;
using OAM_Backend.Models.Responses;

namespace OAM_Backend.Helpers
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            // User -> AuthenticateResponse
            CreateMap<User, AuthenticateResponse>();

            // User -> UserResponse
            CreateMap<User, UserResponse>().ForMember(des => des.FullName, act => act.MapFrom(src => src.LastName + " " + src.FirstName));

            // CategoryRequest -> Category
            CreateMap<CategoryRequest, Category>();

            //Category -> CategoryResponse
            CreateMap<Category, CategoryResponse>();

            //AssetRequestToCreate -> Asset
            CreateMap<AssetRequestToCreate, Asset>();

            //AssetRequestToEdit -> Asset
            CreateMap<AssetRequestToEdit, Asset>();

            //UserRequest -> User
            CreateMap<UserCreationRequest, User>();

            //UserUpdateRequest -> User
            CreateMap<UserUpdateRequest, User>();

            //AssignmentRequest -> Assignment
            CreateMap<AssignmentRequest, Assignment>();

        }
    }
}
