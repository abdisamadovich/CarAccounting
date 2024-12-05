using System.Runtime.Serialization;

namespace MyCar.Errors;

[Serializable]
public class ParameterInvalidException : Exception
{
    public ParameterInvalidException() { }
    public ParameterInvalidException(string message) : base(message) { }
    public ParameterInvalidException(string message, Exception inner) : base(message, inner) { }
    protected ParameterInvalidException(SerializationInfo info, StreamingContext context) : base(info, context) { }
}