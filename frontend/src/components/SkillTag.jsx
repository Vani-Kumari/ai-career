function SkillTag({ text, type }) {
  const style =
    type === "matched"
      ? "bg-green-100 text-green-700"
      : "bg-red-100 text-red-700";

  return (
    <span className={`${style} px-2 py-1 rounded`}>
      {text}
    </span>
  );
}

export default SkillTag;