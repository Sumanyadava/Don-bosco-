import React from 'react';

export default function CoursesPage() {
  const courses = [
    {
      id: 1,
      title: "",
      description: "",
      duration: "",
      instructor: "",
      format: "",
      price: "",
      image: "https://picsum.photos/400/250?random=1"
    },
    {
      id: 2,
      title: "",
      description: "",
      duration: "",
      instructor: "",
      format: "",
      price: "",
      image: "https://picsum.photos/400/250?random=2"
    },
    {
      id: 3,
      title: "",
      description: "",
      duration: "",
      instructor: "",
      format: "",
      price: "",
      image: "https://picsum.photos/400/250?random=3"
    },
    {
      id: 4,
      title: "",
      description: "",
      duration: "",
      instructor: "",
      format: "",
      price: "",
      image: "https://picsum.photos/400/250?random=4"
    },
    {
      id: 5,
      title: "",
      description: "",
      duration: "",
      instructor: "",
      format: "",
      price: "",
      image: "https://picsum.photos/400/250?random=5"
    },
    {
      id: 6,
      title: "",
      description: "",
      duration: "",
      instructor: "",
      format: "",
      price: "",
      image: "https://picsum.photos/400/250?random=6"
    }
  ];

  return (
    <div className="min-h-screen bg-base-200">
      <div className="hero bg-base-100 py-16 shadow-sm">
        <div className="hero-content text-center">
          <div className="max-w-2xl">
            <h1 className="text-5xl font-bold text-base-content">Our Courses</h1>
            <p className="py-6 text-lg text-base-content/80">
              Explore the wide variety of courses we offer here. Currently, we run {courses.length} courses designed to help you achieve your goals. Detailed information will be updated soon.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <div key={course.id} className="card bg-base-100 shadow-xl hover:-translate-y-1 transition-transform duration-300 border border-base-300">
              <figure className="px-4 pt-4">
                <img src={course.image} alt="Course placeholder" className="w-full h-48 object-cover rounded-xl" />
              </figure>
              <div className="card-body">
                <h2 className="card-title text-base-content">
                  {course.title || "Course Title"}
                  <div className="badge badge-secondary badge-sm ml-2">NEW</div>
                </h2>
                <p className="text-base-content/70">
                  {course.description || "Course description will be provided here. Stay tuned for details."}
                </p>
                
                <div className="mt-6 space-y-3 text-sm">
                  <div className="flex justify-between items-center border-b border-base-200 pb-2">
                    <span className="font-semibold text-base-content/80">Duration:</span>
                    <span className="text-base-content">{course.duration || "TBD"}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-base-200 pb-2">
                    <span className="font-semibold text-base-content/80">Instructor:</span>
                    <span className="text-base-content">{course.instructor || "TBD"}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-base-200 pb-2">
                    <span className="font-semibold text-base-content/80">Format:</span>
                    <span className="text-base-content">{course.format || "TBD"}</span>
                  </div>
                  <div className="flex justify-between items-center pb-2">
                    <span className="font-semibold text-base-content/80">Price:</span>
                    <span className="font-bold text-primary text-lg">{course.price || "TBD"}</span>
                  </div>
                </div>

                <div className="card-actions justify-end mt-6">
                  <button className="btn btn-primary w-full shadow-md">Enroll Now</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
