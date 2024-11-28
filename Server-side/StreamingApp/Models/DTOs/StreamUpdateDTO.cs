using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace StreamingApp.Models.DTOs
{
    public class StreamUpdateDTO : StreamDTO
    {
        [JsonPropertyName("streamId")]
        public int StreamId { get; set; }
        [JsonPropertyName("isLive")]
        public bool IsLive { get; set; }
        [JsonPropertyName("streamTitle")]
        public string StreamTitle { get; set; }
        [JsonPropertyName("streamDesc")]
        public string StreamDesc { get; set; }
        [JsonPropertyName("streamStatus")]
        public int StreamStatus { get; set; }
        [JsonPropertyName("streamCategoryId")]
        public int StreamCategoryId { get; set; }
        [JsonPropertyName("streamTagIds")]
        public List<int> StreamTagIds { get; set; }
    }
}