using System;

namespace StreamingApp.Exceptions
{
    public class CustomException : Exception
    {
        public int ErrorCode { get; set; }
        public string Message { get; set; }
        public string InnerExceptionMessage { get; set; }
        public CustomException() : base() {}

        // Constructor cho phép truyền message và mã lỗi
        public CustomException(string message, int errorCode) : base(message)
        {
            ErrorCode = errorCode;
            Message = message;
        }

        // Constructor cho phép truyền message và exception gốc (inner exception)
        public CustomException(string message, Exception innerException) : base(message, innerException) {
            Message = message;
            InnerExceptionMessage = innerException.Message;
        }

        // Constructor cho phép truyền đầy đủ message, mã lỗi, và inner exception
        public CustomException(string message, int errorCode, Exception innerException) : base(message, innerException)
        {
            ErrorCode = errorCode;
            Message = message;
            InnerExceptionMessage = innerException.Message;
        }
    }
}
