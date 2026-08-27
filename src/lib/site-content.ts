export const SITE = {
  name: "Paradigm Design & Construct",
  short: "Paradigm",
  uan: "0300 8569563",
  uanTel: "+923008569563",
  email: "info@paradigms.com.pk",
  headOffice:
    "The Real Arcade, Office No.1, Plot No.19 Business Square, Gulberg Green, Islamabad Capital Territory, Pakistan-44000",
  workshop: "Plot # 1, Sudagar Market, Garden Chowk, Ghori Town, Islamabad",
  logo: "/images/logo.png",
};

export const NAV = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/projects", label: "Projects" },
  { to: "/about", label: "Company" },
  { to: "/contact", label: "Contact" },
] as const;

export const STATS = [
  { value: "150+", label: "Projects finished" },
  { value: "10+", label: "Years experience" },
  { value: "100+", label: "Skilled manpower" },
  { value: "99.9%", label: "Client satisfaction" },
];

export type Service = {
  slug: string;
  title: string;
  image: string;
  short: string;
  body: string[];
};

export type Project = {
  title: string;
  location: string;
  image: string;
  images: string[];
  alt: string;
};

export const SERVICES: Service[] = [
  {
    slug: "civil-construction",
    title: "Civil Construction",
    image: "/images/civil.jpg",
    short:
      "We understand the importance of creating spaces that not only meet your needs but exceed your expectations.",
    body: [
      "At Paradigm, we understand the importance of creating spaces that not only meet your needs but exceed your expectations. That's why we offer a comprehensive range of civil construction services for both residential and commercial projects.",
      "From small remodels to large-scale developments, our team of experts can handle it all. With a focus on quality, we will guide you through every step of the process, from land purchase advice to custom design and construction.",
    ],
  },
  {
    slug: "architectural-development",
    title: "Architectural Development",
    image: "/images/architecture.jpg",
    short:
      "We place the utmost importance on paying attention to detail and delivering personalised services.",
    body: [
      "We place the utmost importance on paying attention to detail and delivering personalized services to our clients. We believe that each project should be a one-of-a-kind creation that reflects our clients' vision and preferences.",
      "Our commitment to design excellence, integrity, and personalized service has made us a standout in the architectural field and building industry — with deep experience in home design, commercial design, institutional design and renovations.",
    ],
  },
  {
    slug: "industrial-construction",
    title: "Industrial Construction",
    image: "/images/industrial.jpg",
    short:
      "Leaders in industrial construction, specialising in cutting-edge technology for plants and facilities.",
    body: [
      "We are leaders in industrial construction and specialize in using cutting-edge technology to design and build facilities that meet our clients' needs. Our experts assist manufacturers in streamlining production and reimagining logistics through the design and construction of warehouses, production and manufacturing units, industrial plants, factories, surgical units and textile units.",
      "Our focus is on providing entire industrial new construction, refurbishment and expansion services that are completed on budget and on time, ensuring that our clients' day-to-day activities run smoothly and efficiently.",
    ],
  },
  {
    slug: "hvac-system",
    title: "HVAC System",
    image: "/images/hvac.jpg",
    short:
      "A trusted name in HVAC services in Islamabad, with over 10 years of experience in the industry.",
    body: [
      "A trusted name in HVAC services in Islamabad, Paradigm has over 10 years of experience in the industry, dedicated to providing top-notch heating, ventilation and air conditioning solutions to our clients.",
      "Our focus on quality, efficiency and affordability has made us a go-to choice for residential and commercial HVAC services throughout Pakistan.",
    ],
  },
  {
    slug: "mep",
    title: "Mechanical, Electrical, & Plumbing",
    image: "/images/mep.jpg",
    short:
      "Cost-efficient mechanical, electrical and plumbing solutions built around your property.",
    body: [
      "Paradigm offers a wealth of experience in delivering top-notch mechanical, electrical and plumbing solutions. With a proven track record of successful projects and a vast portfolio, the company offers cost-efficient MEP services designed to meet the specific needs of your home or business.",
      "Whether you're looking to upgrade your existing systems or install new ones, Paradigm has the knowledge and expertise to ensure your property is equipped with the latest technologies — all while working within your budget constraints.",
    ],
  },
  {
    slug: "mechanical-work",
    title: "Fabrication Work",
    image: "/images/mechanical.jpg",
    short:
      "Consultation, design and build solutions for commercial, industrial and institutional facilities.",
    body: [
      "Our Mechanical Services team offers top-notch consultation, design and building solutions for commercial, industrial and institutional facilities. Our goal is to enhance the efficiency and health of your facility.",
      "With a focus on MEP designs and firefighting services, Paradigm delivers complete and reliable mechanical solutions to meet the unique needs of your project.",
    ],
  },
  {
    slug: "solar-systems",
    title: "Solar Systems",
    image: "/images/solar.png",
    short: "Say goodbye to expensive energy bills and welcome a more sustainable future.",
    body: [
      "Say goodbye to expensive energy bills and welcome a more sustainable future with Paradigm's solar system services. Our team specializes in the installation and maintenance of solar systems, providing a cost-effective and environmentally friendly solution for powering your project.",
    ],
  },
  {
    slug: "infrastructure",
    title: "Infrastructure",
    image: "/images/infrastructure.jpg",
    short:
      "Development, maintenance and management of roads, bridges, airports and water supply systems.",
    body: [
      "These services include the development, maintenance and management of critical infrastructure such as roads, bridges, airports and water supply systems.",
      "We ensure that projects are completed on time, within budget, and to the satisfaction of all stakeholders — meeting every safety and regulatory standard along the way.",
    ],
  },
];

export const PROJECTS: Project[] = [
  {
    title: "Residential",
    location: "Homes and villas",
    image: "/newProjects/newProject1.jpeg",
    images: [
      "/newProjects/newProject1.jpeg",
      "/newProjects/newProject4.jpeg",
      "/newProjects/newProject7.jpeg",
    ],
    alt: "Completed residential home designed and built by Paradigm",
  },
  {
    title: "Commercial",
    location: "Retail and office spaces",
    image: "/newProjects/newProject2.jpeg",
    images: [
      "/newProjects/newProject2.jpeg",
      "/newProjects/newProject5.jpeg",
      "/newProjects/newProject6.jpeg",
    ],
    alt: "Completed commercial property delivered by Paradigm",
  },
  {
    title: "Industrial",
    location: "Facilities and infrastructure",
    image: "/newProjects/newProject3.jpeg",
    images: [
      "/newProjects/newProject3.jpeg",
      "/newProjects/newProject8.jpeg",
      "/newProjects/newProject11.jpeg",
    ],
    alt: "Completed industrial facility delivered by Paradigm",
  },
  {
    title: "Architectural",
    location: "Design and development",
    image: "/newProjects/newProject9.jpeg",
    images: [
      "/newProjects/newProject9.jpeg",
      "/newProjects/newProject10.jpeg",
      "/newProjects/newProject12.jpeg",
    ],
    alt: "Contemporary architectural project designed by Paradigm",
  },
  {
    title: "Fabrication",
    location: "Custom metalwork",
    image: "/newProjects/newProject13.jpeg",
    images: [
      "/newProjects/newProject13.jpeg",
      "/newProjects/newProject14.jpeg",
      "/images/mechanical.jpg",
    ],
    alt: "Precision fabrication work completed by Paradigm",
  },
];

export const TESTIMONIALS = [
  {
    name: "Qadafiullah",
    role: "CEO, The Zifaq Pvt Ltd",
    quote:
      "They are reliable, efficient, and produce high-quality work. They worked with us to design and build our dream home, and we couldn't be happier with the end result. They truly exceeded our expectations.",
  },
  {
    name: "Muneeb Iftikhar",
    role: "House Owner",
    quote:
      "I recently hired this construction company for a home renovation project. The team was professional, skilled, and completed the work within the expected timeframe.",
  },
  {
    name: "Ayesha Khan",
    role: "Homeowner, Islamabad",
    quote:
      "From the first design meeting to the final handover, the Paradigm team kept every detail organized. Our home feels thoughtful, solid, and completely ours.",
  },
  {
    name: "Hamza Rauf",
    role: "Director, Rauf Trading",
    quote:
      "The team delivered our commercial space with impressive attention to quality and timelines. Their engineers were responsive and practical throughout the build.",
  },
  {
    name: "Sana Ahmed",
    role: "Project Lead, Islamabad",
    quote:
      "Paradigm turned a complicated renovation into a smooth experience. They listened carefully, communicated clearly, and delivered a finish we are proud to show clients.",
  },
  {
    name: "Usman Farooq",
    role: "Factory Owner, Rawalpindi",
    quote:
      "Their industrial construction knowledge made a real difference on our facility. The work was disciplined, safe, and completed without compromising the schedule.",
  },
  {
    name: "Nadia Malik",
    role: "House Owner, Bahria Enclave",
    quote:
      "We always knew what was happening next and why. The finished house reflects our ideas beautifully, with craftsmanship that shows in every room.",
  },
  {
    name: "Bilal Shah",
    role: "Operations Manager, Islamabad",
    quote:
      "The Paradigm crew handled our office expansion with great professionalism. The quality of the work and the clarity of communication stood out from day one.",
  },
];

export const FAQS = [
  {
    q: "What kind of construction does Paradigm Design & Construct specialize in?",
    a: "Paradigm Design & Construct specializes in industrial construction, civil construction, architectural development, infrastructure, solar systems, mechanical work, Mechanical, Electrical, & Plumbing and HVAC systems.",
  },
  {
    q: "Does Paradigm Design & Construct have its own crew, or does it hire subcontractors?",
    a: "Paradigm Design & Construct has its own crew of experienced professionals who work closely with clients to ensure that each project is completed to their satisfaction.",
  },
  {
    q: "What certifications and training does Paradigm Design & Construct have?",
    a: "Paradigm Design & Construct is registered with FBR, SECP and other government bodies. The company's professionals have years of experience in the construction industry and are trained in using the latest technology and techniques to deliver high-quality results.",
  },
];

export const CLIENTS = [
  "/images/client-1.png",
  "/images/client-2.png",
  "/images/client-3.png",
  "/images/client-4.png",
  "/images/fwo.jpg",
  "/images/mes.jpg",
];

export const WA_NUMBER = SITE.uanTel.replace(/[^0-9]/g, "");

export const waLink = (message: string) =>
  `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
