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
                PublicationDate = comment.PublicationDate,
                AuthorName = comment.AppUser?.UserName
            };
        }
    }
}
