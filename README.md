

 # ToDo App (React   TypeScript   Vite)
 
 A simple ToDo application built with React, TypeScript, Vite, and React-Bootstrap.
 
 - Node 18 
 - React 18/19
 - TypeScript 5
 - Vite 7
 
 ## ### **📱 Deployment & Hosting**
- **Live Demo**: Deployed on Netlify at `https://mytodolistreacttypes.netlify.app/`
- **Easy Deployment**: Ready for production deployment 


 ## Getting started
 
 ```bash
 npm install
 npm run dev
 ```
 
 Then open the dev server URL printed in your terminal.
 
 ## Scripts
 - `npm run dev`: Start the dev server
 - `npm run build`: Type-check and build for production
 - `npm run preview`: Preview the production build locally
 - `npm run lint`: Run ESLint
 
 ## Documentation
 - API and Component Reference: see `docs/API.md`
 
 ## Tech
 - UI components: React-Bootstrap (`bootstrap/dist/css/bootstrap.min.css` is imported in `src/main.tsx`)
 
 ## Project structure
 ```
 src/
   components/
     Header.tsx
     Footer.tsx
     InputToDo.tsx
     AllToDos.tsx
     ToDo.tsx
   resources/
     data/todoList.json
     types/propsTypes.tsx
   App.tsx
   main.tsx
 public/
 ```

 ## Screenshot

 ![Screenshot](https://github.com/scodingjs/todolist/blob/main/src/assets/Screenshot.png)
 

 ![Screenshot](https://github.com/scodingjs/todolist/blob/main/src/assets/lighthouse.png)


 ![Cypress Component](https://github.com/scodingjs/todolist/blob/testing/src/assets/cypress_component.png)


## 📋 **TodoList App Features**

### **🚀 Core Features**
- **Add New Todos**: Create new todo items with text input
- **Edit Todos**: Modify existing todo text inline  
- **Delete Todos**: Remove todos from the list
- **Mark Complete/Incomplete**: Toggle completion status of todos
- **Local Storage Persistence**: Todos are saved locally and persist after browser reload

### **🎨 User Interface & Experience**
- **Responsive Design**: Built with React-Bootstrap for mobile-friendly UI
- **Clean Modern Interface**: Simple, intuitive todo management interface
- **Real-time Updates**: Instant UI updates when adding/editing/deleting todos
- **Form Reset**: Input form resets automatically after adding todos

### **⚡ Technical Features**
- **React 18/19**: Modern React with functional components
- **TypeScript 5**: Full type safety and better developer experience
- **Vite 7**: Fast build tool and development server
- **Component Architecture**: Modular component structure:
  - `Header.tsx` - App header component
  - `Footer.tsx` - App footer component  
  - `InputToDo.tsx` - Todo input form component
  - `AllToDos.tsx` - Todo list container component
  - `ToDo.tsx` - Individual todo item component
- **Props Types**: Proper TypeScript interfaces in `propsTypes.tsx`
- **Performance Optimized**: Lazy loading implementation for better performance

### **🔧 Development Features**
- **ESLint Integration**: Code quality and consistency
- **Hot Reload**: Development server with instant updates
- **Production Ready**: Optimized production builds
- **Lighthouse Optimized**: High performance scores (based on lighthouse report)




### **🛠️ Developer Experience**
- **Node 18** compatibility
- **npm/yarn** package management
- **Development Scripts**:
  - `npm run dev` - Start development server
  - `npm run build` - Production build  
  - `npm run preview` - Preview production build
  - `npm run lint` - Code linting

This is a well-structured, production-ready TodoList application that demonstrates best practices for React + TypeScript development with modern tooling and performance optimization!