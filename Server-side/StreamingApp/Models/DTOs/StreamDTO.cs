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
        public int streamCategoryId { get; set; }
        public int streamTagId { get; set; }
    }
}