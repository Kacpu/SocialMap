using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SocialMap.Infrastructure.DTO
{
    public class DateDTO
    {
        public int Day { get; set; }
        public int Month { get; set; }
        public int Year { get; set; }

        public DateDTO(DateTime dateTime)
        {
            Day = dateTime.Day;
            Month = dateTime.Month;
            Year = dateTime.Year;
        }
    }
}
