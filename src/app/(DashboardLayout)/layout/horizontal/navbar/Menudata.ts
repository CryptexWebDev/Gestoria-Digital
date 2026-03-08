import { uniqueId } from 'lodash';

const Menuitems = [
  {
    id: uniqueId(),
    title: 'Inicio',
    icon: 'screencast-2-line-duotone',
    href: '/',
    bgcolor: "primary",
  },
  {
    id: uniqueId(),
    title: "Datos",
    icon: 'database-line-duotone',
    href: "/datos",
    bgcolor: "secondary",
  },
  {
    id: uniqueId(),
    title: "Fiscal",
    icon: 'document-text-line-duotone',
    href: "/fiscal",
    bgcolor: "success",
  },
  {
    id: uniqueId(),
    title: "Laboral",
    icon: 'users-group-two-rounded-line-duotone',
    href: "/laboral/documentos-laborales",
    bgcolor: "warning",
    children: [
      {
        id: uniqueId(),
        title: "Documentos laborales",
        href: "/laboral/documentos-laborales",
      },
      {
        id: uniqueId(),
        title: "Trabajadores",
        href: "/laboral/trabajadores",
      },
    ],
  },
  {
    id: uniqueId(),
    title: "Facturación",
    icon: 'bill-line-duotone',
    href: "/facturacion",
    bgcolor: "error",
  },
  {
    id: uniqueId(),
    title: "Contabilidad",
    icon: 'chart-square-line-duotone',
    href: "/contabilidad",
    bgcolor: "info",
  },
  {
    id: uniqueId(),
    title: 'Ajustes',
    icon: 'settings-minimalistic-line-duotone',
    href: '/theme-pages/account-settings',
    bgcolor: "secondary",
  },
];
export default Menuitems;
