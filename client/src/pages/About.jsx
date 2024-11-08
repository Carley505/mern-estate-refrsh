import React from "react";

export default function About() {
  return (
    <div className="py-20 px-4 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-slate-800">
        About Bicycle Rental App (BRA)
      </h1>
      <div className="space-y-4">
        <div>
          <h2 className="font-semibold text-lg">About Us</h2>
          <p>
            Welcome to Bicycle Rental App, your go-to app for convenient, eco-friendly,
            and accessible bike rentals! Whether you're commuting to work,
            exploring a new city, or just looking for a fun way to stay active,
            Bicycle Rental App offers an easy, flexible, and affordable solution to get
            you moving.
          </p>
        </div>
        <div>
          <h2 className="font-semibold text-lg">Our Mission</h2>
          <p>
            At Bicycle Rental App, we’re passionate about promoting green transportation
            options and making it easier for everyone to enjoy the freedom of
            cycling. We believe in a healthier, sustainable future and are
            committed to offering an efficient way for people to get around
            without the need for a car. From everyday rides to weekend
            adventures, we’re here to provide a hassle-free bike rental
            experience.
          </p>
        </div>
        <div>
          <h2 className="font-semibold text-lg">Our Vision</h2>
          <p>
            We envision a world where cities are bike-friendly, sustainable, and
            accessible to everyone. By making bike rentals simple, affordable,
            and enjoyable, Bicycle Rental App aims to inspire more people to choose
            cycling for transportation, health, and pleasure.
            <span className="mt-4">
              Thank you for choosing Bicycle Rental App as your cycling companion. Let’s
              ride towards a greener, healthier future together!
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
