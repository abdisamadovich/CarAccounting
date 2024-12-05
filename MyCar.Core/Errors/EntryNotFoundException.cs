using System.Runtime.Serialization;

namespace MyCar.Errors;

[Serializable]
public class EntryNotFoundException : Exception
{
    public EntryNotFoundException() { }
    public EntryNotFoundException(string message) : base(message) { }
    public EntryNotFoundException(string message,Exception exception) : base(message, exception) { }
    protected EntryNotFoundException(SerializationInfo info, StreamingContext context) : base(info,context) { }
}