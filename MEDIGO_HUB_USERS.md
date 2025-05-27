# MediGo Hub - Usuarios de Prueba

## Información General
MediGo Hub es la plataforma administrativa que utilizan únicamente los siguientes roles:
- **PLATFORM**: Administradores de la plataforma
- **PROVIDER**: Proveedores de servicios de salud
- **STAFF**: Personal administrativo (de plataforma o proveedores)

**Nota**: Los roles CLIENT y OPERATOR no usan MediGo Hub:
- **CLIENT**: Usa medigo-app (aplicación móvil para pacientes)
- **OPERATOR**: Usa medigo-ops (aplicación para personal de campo)

## Usuarios Disponibles

### 1. PLATFORM (Administrador de Plataforma)
**Email**: `admin@medgohub.com`  
**Password**: `platform123`  
**Permisos**: Acceso completo a toda la plataforma  
**Navegación**: Todas las secciones disponibles

---

### 2. STAFF - Platform Finance
**Email**: `finance@medgohub.com`  
**Password**: `finance123`  
**Tipo**: Personal Financiero - Plataforma  
**Navegación**: Inicio, Facturación, Reportes, Configuración

---

### 3. STAFF - Platform Support
**Email**: `support@medgohub.com`  
**Password**: `support123`  
**Tipo**: Personal de Soporte - Plataforma  
**Navegación**: Inicio, Reportes, Configuración

---

### 4. PROVIDER - Medical Center
**Email**: `provider.medical@medgohub.com`  
**Password**: `medical123`  
**Tipo**: Proveedor - Centro Médico  
**Navegación**: Inicio, Consultas, Pacientes, Farmacia, Laboratorio, Emergencias, Atención Domiciliaria, Expedientes Médicos, Finanzas, Personal, Reportes, Configuración

---

### 5. PROVIDER - Pharmacy
**Email**: `provider.pharmacy@medgohub.com`  
**Password**: `pharmacy123`  
**Tipo**: Proveedor - Farmacia  
**Navegación**: Inicio, Farmacia, Finanzas, Personal, Reportes, Configuración

---

### 6. PROVIDER - Laboratory
**Email**: `provider.lab@medgohub.com`  
**Password**: `lab123`  
**Tipo**: Proveedor - Laboratorio  
**Navegación**: Inicio, Laboratorio, Finanzas, Personal, Reportes, Configuración

---

### 7. PROVIDER - Emergency
**Email**: `provider.emergency@medgohub.com`  
**Password**: `emergency123`  
**Tipo**: Proveedor - Emergencias  
**Navegación**: Inicio, Emergencias, Finanzas, Personal, Reportes, Configuración

---

### 8. PROVIDER - Homecare
**Email**: `provider.homecare@medgohub.com`  
**Password**: `homecare123`  
**Tipo**: Proveedor - Atención Domiciliaria  
**Navegación**: Inicio, Atención Domiciliaria, Expedientes Médicos, Finanzas, Personal, Reportes, Configuración

---

### 9. PROVIDER - Office Specialist
**Email**: `provider.specialist@medgohub.com`  
**Password**: `specialist123`  
**Tipo**: Proveedor - Especialista Consultorio  
**Navegación**: Inicio, Consultas, Pacientes, Expedientes Médicos, Finanzas, Reportes, Configuración

---

### 10. PROVIDER - Virtual Specialist
**Email**: `provider.virtual@medgohub.com`  
**Password**: `virtual123`  
**Tipo**: Proveedor - Especialista Virtual  
**Navegación**: Inicio, Consultas, Pacientes, Expedientes Médicos, Finanzas, Reportes, Configuración

---

### 11. STAFF - Provider Finance (Medical Center)
**Email**: `staff.finance.provider@medgohub.com`  
**Password**: `stafffinance123`  
**Tipo**: Personal Financiero - Proveedor  
**Navegación**: Inicio, Finanzas, Configuración

---

### 12. STAFF - Provider Support (Medical Center)
**Email**: `staff.support.provider@medgohub.com`  
**Password**: `staffsupport123`  
**Tipo**: Personal de Soporte - Proveedor  
**Navegación**: Inicio, Consultas, Pacientes, Farmacia, Laboratorio, Emergencias, Atención Domiciliaria, Expedientes Médicos, Personal, Configuración

---

### 13. STAFF - Provider Finance (Pharmacy)
**Email**: `staff.finance.pharmacy@medgohub.com`  
**Password**: `pharmacyfinance123`  
**Tipo**: Personal Financiero - Proveedor  
**Navegación**: Inicio, Finanzas, Configuración

---

### 14. STAFF - Provider Support (Pharmacy)
**Email**: `staff.support.pharmacy@medgohub.com`  
**Password**: `pharmacysupport123`  
**Tipo**: Personal de Soporte - Proveedor  
**Navegación**: Inicio, Farmacia, Personal, Configuración

## Características del Sistema

### Navegación Inteligente
- Cada usuario ve únicamente las opciones de navegación que puede usar según su rol y permisos
- Los tipos de staff (FINANCE vs SUPPORT) tienen acceso a diferentes secciones
- Los tipos de provider tienen acceso a secciones específicas de su especialidad

### Información de Perfil
- El dropdown del usuario muestra información detallada del rol
- Se muestran permisos específicos del usuario
- Información de entidad padre para staff de proveedores

### Logout Siempre Visible
- El botón de logout está siempre visible en la barra superior
- También disponible en el dropdown del usuario
- Funciona correctamente en todos los perfiles

### Notificaciones
- Cada tipo de usuario tiene un número diferente de notificaciones simuladas
- PLATFORM: 8 notificaciones
- PROVIDER: 5 notificaciones  
- STAFF: 3 notificaciones 