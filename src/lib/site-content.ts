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
  alt: string;
};

export const SERVICES: Service[] = [
  {
    slug: "civil-construction",
    title: "Civil Construction",
    image: "/images/civil-construction.jpg",
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
    short: "Cost-efficient mechanical, electrical and plumbing solutions built around your property.",
    body: [
      "Paradigm offers a wealth of experience in delivering top-notch mechanical, electrical and plumbing solutions. With a proven track record of successful projects and a vast portfolio, the company offers cost-efficient MEP services designed to meet the specific needs of your home or business.",
      "Whether you're looking to upgrade your existing systems or install new ones, Paradigm has the knowledge and expertise to ensure your property is equipped with the latest technologies — all while working within your budget constraints.",
    ],
  },
  {
    slug: "mechanical-work",
    title: "Mechanical Work",
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
    title: "Shell Site I-8 Markaz Islamabad",
    location: "Bahria Enclave",
    image: "/newProjects/newProject1.jpeg",
    alt: "Completed commercial mall with premium retail frontage",
  },
  {
    title: "Petrol Pump Site Islamabad",
    location: "Islamabad",
    image: "/newProjects/newProject2.jpeg",
    alt: "Finished mixed-use plaza at Shell I-8 Markaz",
  },
  {
    title: "Commercial Site",
    location: "Islamabad",
    image: "/newProjects/newProject3.jpeg",
    alt: "Completed luxury villa development in Islamabad",
  },
  {
    title: "Private Residence",
    location: "Bahria Town",
    image: "/newProjects/newProject4.jpeg",
    alt: "Finished contemporary residence with landscaped grounds",
  },
  {
    title: "Hongkong Plaza",
    location: "Raja Bazar, Rawalpindi",
    image: "/newProjects/newProject5.jpeg",
    alt: "Completed retail and office plaza in Rawalpindi",
  },
  {
    title: "The Heights",
    location: "Islamabad",
    image: "/newProjects/newProject6.jpeg",
    alt: "Finished high-rise residential tower in Islamabad",
  },
  {
    title: "Private Residence",
    location: "Bahria Enclave",
    image: "/newProjects/newProject7.jpeg",
    alt: "Completed modern family home in Bahria Enclave",
  },
  {
    title: "Oil Storage Facility",
    location: "Punjab",
    image: "/newProjects/newProject8.jpeg",
    alt: "Finished industrial storage facility and infrastructure",
  },
];

export const TESTIMONIALS = [
  {
    name: "Malik Adnan",
    role: "CEO, Prime Associates",
    quote:
      "Paradigm is extremely professional and easy to work with. They are constantly learning the new trends in the market and offer unique ideas on how to make your project your own!",
  },
  {
    name: "Nouman Aslam",
    role: "CEO, Real Solutions",
    quote:
      "Paradigm did a complete build out of our basement. Their quality of work is superior.",
  },
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
];

export const WA_NUMBER = SITE.uanTel.replace(/[^0-9]/g, "");

export const waLink = (message: string) =>
  `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
