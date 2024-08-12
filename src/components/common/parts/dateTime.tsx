function DateTime({ timestamp }: { timestamp: string }) {
  const date = new Date(timestamp);

  return (
    <time dateTime={timestamp}>{date.toLocaleString()}</time>
  );
}

export default DateTime;