import React from "react";
import {
  MDBCarousel,
  MDBCarouselItem,
  MDBCarouselCaption,
} from "mdb-react-ui-kit";

export default function ImageSlider() {
  return (
    <MDBCarousel interval={1500}>
      {" "}
      {/* Change images every 3 seconds */}
      <MDBCarouselItem itemId={1} className="active">
        <img
          src="kartar2.jpeg" // Replace with actual tractor image URL
          alt="First slide"
          className="d-block w-100"
        />
        {/* <MDBCarouselCaption>
          <h5>Tractor Model 1</h5>
          <p>High-performance tractor for all your farming needs.</p>
        </MDBCarouselCaption> */}
      </MDBCarouselItem>
      <MDBCarouselItem itemId={2}>
        <img
          src="p4.jpg" // Replace with actual tractor image URL
          alt="Second slide"
          className="d-block w-100"
        />
        {/* <MDBCarouselCaption>
          <h5>Tractor Model 2</h5>
          <p>Durable and efficient for heavy-duty tasks.</p>
        </MDBCarouselCaption> */}
      </MDBCarouselItem>
      <MDBCarouselItem itemId={3}>
        <img
          src="p2.jpg" // Replace with actual tractor image URL
          alt="Third slide"
          className="d-block w-100"
        />
        {/* <MDBCarouselCaption>
          <h5>Tractor Model 3</h5>
          <p>Compact design for easy maneuverability.</p>
        </MDBCarouselCaption> */}
      </MDBCarouselItem>
      <MDBCarouselItem itemId={4}>
        <img
          src="p1 (1).jpg" // Replace with actual tractor image URL
          alt="Fourth slide"
          className="d-block w-100"
        />
        {/* <MDBCarouselCaption>
          <h5>Tractor Model 4</h5>
          <p>Advanced technology for modern farming.</p>
        </MDBCarouselCaption> */}
      </MDBCarouselItem>
    </MDBCarousel>
  );
}
