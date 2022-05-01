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
                UserfrontId = createAppUser.Record.UserUuid,
                UserName = createAppUser.Record.Name
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

        public static Comment ToDomain(this CreateComment createComment)
        {
            return new Comment()
            {
                POIId = createComment.POIId,
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

        public static POIDTO ToDTO(this POI poi)
        {
            return new POIDTO()
            {
                Id = poi.Id
            };
        }
    }
}
