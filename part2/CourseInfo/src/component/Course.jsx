const Course = ({ course }) => {
  const totalExercises = course.parts.reduce(
    (accumulator, currentPart) => accumulator + currentPart.exercises,
    0
  );
  return (
    <div>
      <h1>{course.name}</h1>
      {course.parts.map((part) => (
        <p key={part.id}>
          {part.name} {part.exercises}
        </p>
      ))}
      <b>total of {totalExercises} exercises</b>
    </div>
  );
};

export default Course;
