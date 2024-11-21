using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StreamingApp.Models.DTOs
{
    public class StreamUpdateDTO : StreamDTO
    {
        public int StreamId { get; set; }
        public bool IsLive { get; set; }
        public string StreamTitle { get; set; }
        public string StreamDesc { get; set; }
        public int streamCategoryId { get; set; }
        public List<int> streamTagIds { get; set; }
    }
}