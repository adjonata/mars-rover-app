type Details = {
  name: string;
  description: string;
};

type Message = {
  message: string;
  details?: Details;
};

export default function message({ message, details }: Message): Message {
  return {
    message,
    details
  };
}
