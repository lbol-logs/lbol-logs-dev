function DateTime({ timestamp }: { timestamp: string }) {
  const date = new Date(timestamp);

  return (
    <span>{date.toLocaleString()}</span>
  );
}

export default DateTime;