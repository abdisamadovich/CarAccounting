using System.Runtime.Serialization;

namespace MyCar.Errors;

[Serializable]
public class NotFoundException : Exception
{
    public NotFoundException() { }
    public NotFoundException(string message) : base(message) { }
    public NotFoundException(string message, Exception exception) : base(message, exception) { }
    protected NotFoundException(SerializationInfo info, StreamingContext context) : base(info, context) { }
}
