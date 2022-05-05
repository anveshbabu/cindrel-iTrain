
const routers = [

  {
    component: 'AuthLayout',
    path: '/',
    auth: false,
    exact: false,
    childrens: [
      {
        component: "Login",
        path: "/",
        auth: false,
        exact: true,
      },
    ]
  },
  {
    component: "Adminlayout",
    path: "/dashboard",
    redirect: "/",
    auth: false,
    exact: true,
    childrens: [
      {
        component: "Dashboard",
        path: "/",
        auth: false,
        exact: true
      }
    ]
  },


  {
    component: "Adminlayout",
    path: "/models",
    auth: false,
    exact: false,
    childrens: [
      {
        component: "ProductionModels",
        path: "/:fromType",
        auth: false,
        exact: true
      }

    ]
  },








  //dev layout

  {
    component: "Adminlayout",
    path: "/devLayout",
    redirect: "/devLayout/components/",
    auth: false,
    exact: false,
    childrens: [
      {
        component: "commonComponentsExample",
        path: "/",
        auth: false,
        exact: true
      }
    ]
  }



];
export default routers;

