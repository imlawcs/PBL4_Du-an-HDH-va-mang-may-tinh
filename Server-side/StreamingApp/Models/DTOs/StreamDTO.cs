using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using StreamingApp.Models.Entities;
using Stream = StreamingApp.Models.Entities.Stream;

namespace StreamingApp.Models.DTOs
{
    public class StreamDTO
    {
        public int UserId { get; set; }
        public bool IsLive { get; set; }
        public string StreamTitle { get; set; }
        public string StreamDesc { get; set; }
        public int StreamCategoryId { get; set; }
        public int StreamStatus { get; set; }
        public List<int> StreamTagIds { get; set; }
    }
}