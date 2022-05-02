using SocialMap.Core.Domain;
using SocialMap.Infrastructure.Commands;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SocialMap.Infrastructure.DTO
{
    public static class DTOExtensions
    {
        public static AppUser ToDomain(this CreateAppUser createAppUser)
        {
            return new AppUser()
            {
                UserfrontId = createAppUser.Record?.UserUuid,
                UserName = createAppUser.Record?.Name
            };
        }

        public static AppUserDTO ToDTO(this AppUser appUser)
        {
            return new AppUserDTO()
            {
                Id = appUser.Id,
                UserfrontId = appUser.UserfrontId,
                UserName = appUser.UserName
            };
        }

        public static Category ToDomain(this CreateCategory c)
        {
            return new Category()
            {
                Name = c.Name
            };
        }

        public static CategoryDTO ToDTO(this Category c)
        {
            return new CategoryDTO()
            {
                Id = c.Id,
                Name = c.Name
            };
        }

        public static Comment ToDomain(this CreateComment createComment)
        {
            return new Comment()
            {
                AppUserId = createComment.CreatorId,
                POIId = createComment.PoiId,
                Content = createComment.Content
            };
        }

        public static CommentDTO ToDTO(this Comment comment)
        {
            return new CommentDTO()
            {
                Id = comment.Id,
                Content = comment.Content,
                PublicationDate = new DateDTO(comment.PublicationDate),
                AuthorName = comment.AppUser?.UserName
            };
        }

        public static POIAccess ToDomain(this CreatePOIAccess createPOIAccess)
        {
            return new POIAccess()
            {
                POIId = createPOIAccess.POIId,
                AppUserId = createPOIAccess.InvitedUserId
            };
        }

        public static POIAccessDTO ToDTO(this POIAccess poiAccess)
        {
            return new POIAccessDTO()
            {
                Id = poiAccess.Id,
                AppUserId = poiAccess.AppUserId,
                POIId = poiAccess.POIId,
                IsAccpeted = poiAccess.IsAccepted,
                IssueDate = new DateDTO(poiAccess.IssueDate),
                InvitedUserName = poiAccess.AppUser?.UserName,
                IssuerName = poiAccess.POI?.AppUser?.UserName,
                POIDTO = poiAccess.POI?.ToDTO()
            };
        }

        public static POI ToDomain(this CreatePOI p)
        {
            return new POI()
            {
                Name = p.Name,
                X = p.X,
                Y = p.Y,
                Description = p.Description,
                IsGlobal = p.IsGlobal,
            };
        }

        public static POIDTO ToDTO(this POI p)
        {
            return new POIDTO()
            {
                Id = p.Id,
                Name = p.Name,
                X = p.X,
                Y = p.Y,
                Description = p.Description,
                IsGlobal = p.IsGlobal,
                IsAccepted = p.IsAccepted,
                CreatorId = p.AppUserId,
                CreatorName = p.AppUser?.UserName,
                LikesNumber = p.Likes?.Count ?? 0,
                CategoryDTOs = p.Categories?.Select(c => c.ToDTO())
            };
        }

        public static Like ToDomain(this CreateLike l)
        {
            return new Like()
            {
                AppUserId = l.AppUserId,
                POIId = l.PoiId
            };
        }

        public static LikeDTO ToDTO(this Like l)
        {
            return new LikeDTO()
            {
                Id = l.Id,
                PoiId = l.POIId,
                AppUserId = l.AppUserId
            };
        }
    }
}
