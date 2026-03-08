// Notifications dropdown

interface notificationType {
  avatar: string;
  title: string;
  subtitle: string;
}

const notifications: notificationType[] = [
  {
    avatar: "/images/profile/user-1.jpg",
    title: "Roman Joined the Team!",
    subtitle: "Congratulate him",
  },
  {
    avatar: "/images/profile/user-2.jpg",
    title: "New message received",
    subtitle: "Salma sent you new message",
  },
  {
    avatar: "/images/profile/user-3.jpg",
    title: "New Payment received",
    subtitle: "Check your earnings",
  },
  {
    avatar: "/images/profile/user-4.jpg",
    title: "Jolly completed tasks",
    subtitle: "Assign her new tasks",
  },
  {
    avatar: "/images/profile/user-1.jpg",
    title: "Roman Joined the Team!",
    subtitle: "Congratulate him",
  },
  {
    avatar: "/images/profile/user-2.jpg",
    title: "New message received",
    subtitle: "Salma sent you new message",
  },
  {
    avatar: "/images/profile/user-3.jpg",
    title: "New Payment received",
    subtitle: "Check your earnings",
  },
  {
    avatar: "/images/profile/user-4.jpg",
    title: "Jolly completed tasks",
    subtitle: "Assign her new tasks",
  },
];

// Messages dropdown

interface messageType {
  avatar: string;
  title: string;
  subtitle: string;
  time: string;
}

const messages: messageType[] = [
  {
    avatar: "/images/profile/user1.jpg",
    title: "Roman Joined the Team!",
    subtitle: "Congratulate him",
    time: '9:08 AM'
  },
  {
    avatar: "/images/profile/user2.jpg",
    title: "New message received",
    subtitle: "Salma sent you new message",
    time: '19:08 PM'
  },
  {
    avatar: "/images/profile/user3.jpg",
    title: "New Payment received",
    subtitle: "Check your earnings",
    time: '4:15 AM'
  },
  {
    avatar: "/images/profile/user4.jpg",
    title: "Jolly completed tasks",
    subtitle: "Assign her new tasks",
    time: '9:08 AM'
  },
  {
    avatar: "/images/profile/user5.jpg",
    title: "Roman Joined the Team!",
    subtitle: "Congratulate him",
    time: '12:08 AM'
  },
];


// apps dropdown

interface appsLinkType {
  href: string;
  title: string;
  subtext: string;
  avatar: string;
}

const appsLink: appsLinkType[] = [
  {
    href: "/",
    title: "Inicio",
    subtext: "Panel principal",
    avatar: "/images/svgs/icon-dd-chat.svg",
  },
  {
    href: "/facturacion",
    title: "Facturación",
    subtext: "Facturas y documentos",
    avatar: "/images/svgs/icon-dd-cart.svg",
  },
  {
    href: "/contabilidad",
    title: "Contabilidad",
    subtext: "Asientos y libro diario",
    avatar: "/images/svgs/icon-dd-invoice.svg",
  },
  {
    href: "/fiscal",
    title: "Fiscal",
    subtext: "Declaraciones",
    avatar: "/images/svgs/icon-dd-date.svg",
  },
  {
    href: "/laboral/trabajadores",
    title: "Trabajadores",
    subtext: "Equipo laboral",
    avatar: "/images/svgs/icon-dd-mobile.svg",
  },
  {
    href: "/datos",
    title: "Datos",
    subtext: "Datos de la empresa",
    avatar: "/images/svgs/icon-dd-application.svg",
  },
];

interface LinkType {
  href: string;
  title: string;
}

const pageLinks: LinkType[] = [
  {
    href: "/",
    title: "Inicio",
  },
  {
    href: "/auth/auth1/login",
    title: "Iniciar sesión",
  },
  {
    href: "/404",
    title: "Página no encontrada",
  },
  {
    href: "/datos",
    title: "Datos",
  },
  {
    href: "/facturacion",
    title: "Facturación",
  },
];

export { notifications,   pageLinks, appsLink, messages };
