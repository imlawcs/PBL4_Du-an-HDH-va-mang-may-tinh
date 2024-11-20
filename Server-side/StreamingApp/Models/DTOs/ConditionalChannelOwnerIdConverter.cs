using System.Text.Json;
using System.Text.Json.Serialization;
using StreamingApp.Models.DTOs;

public class ConditionalChannelOwnerIdConverter : JsonConverter<UserRoleDetailDto>
    {
        public override UserRoleDetailDto Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
        {
            throw new NotImplementedException();
        }

        public override void Write(Utf8JsonWriter writer, UserRoleDetailDto value, JsonSerializerOptions options)
        {
            writer.WriteStartObject();
            writer.WriteNumber("userId", value.UserId);
            writer.WriteString("username", value.Username);
            writer.WriteString("roleName", value.RoleName);
            
            if (value.ShouldSerializeChannelOwnerId)
            {
                writer.WriteNumber("channelOwnerId", value.ChannelOwnerId);
            }
            
            writer.WriteEndObject();
        }
    }