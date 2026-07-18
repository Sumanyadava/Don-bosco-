export const metadata = {
  title: "About",
  description: "Mission and Vision page"
};

export default function Page() {
  return (
    <main className="min-h-screen bg-base-200 p-8">
      <section className="container mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">About Us</h1>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Our Mission</h2>
              <p>/* Mission content will be added later */</p>
            </div>
          </div>
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Our Vision</h2>
              <p>/* Vision content will be added later */</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
