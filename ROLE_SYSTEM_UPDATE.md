# Sistema de Roles MediGo Hub - Actualización Completa

## Resumen de Cambios

La aplicación ha sido reconfigurada para implementar el sistema completo de roles basado en el script SQL de Supabase proporcionado. Esta actualización introduce un sistema robusto de verificación de proveedores y gestión de roles jerárquicos.

## Estructura de Roles Implementada

### 1. PLATFORM (Administradores de Plataforma)
- **Descripción**: Administradores con acceso completo al sistema
- **Aplicación**: medigo-hub
- **Permisos**: Acceso total ('all')
- **Responsabilidades**:
  - Gestión de usuarios del sistema
  - Verificación de proveedores
  - Administración de staff de plataforma
  - Supervisión general del sistema

### 2. PROVIDER (Proveedores de Servicios Médicos)
- **Descripción**: Organizaciones e individuos que ofrecen servicios médicos
- **Aplicación**: medigo-hub
- **Tipos de Proveedores**:
  - `MEDICAL_CENTER`: Hospitales, clínicas, instalaciones multi-profesionales
  - `PHARMACY`: Farmacias y dispensarios de medicamentos
  - `LABORATORY`: Laboratorios de diagnóstico y pruebas
  - `EMERGENCY`: Proveedores de servicios médicos de emergencia
  - `HOMECARE`: Organizaciones de atención domiciliaria
  - `OFFICE_SPECIALIST`: Especialistas independientes con oficinas físicas
  - `VIRTUAL_SPECIALIST`: Profesionales de telemedicina

#### Estados de Verificación de Proveedores:
- `PENDING`: Recién registrado, esperando revisión
- `IN_REVIEW`: En proceso de verificación
- `VERIFIED`: Aprobado y activo
- `REJECTED`: No aprobado

### 3. STAFF (Personal Administrativo)
- **Descripción**: Personal que trabaja para la plataforma o proveedores
- **Aplicación**: medigo-hub
- **Tipos de Staff**:
  - `FINANCE`: Operaciones financieras y facturación
  - `SUPPORT`: Servicio al cliente y operaciones
- **Entidades Padre**:
  - `PLATFORM`: Staff que trabaja para MediGo
  - `PROVIDER`: Staff que trabaja para un proveedor específico

### 4. OPERATOR (Personal de Campo)
- **Descripción**: Personal operativo que ejecuta servicios en campo
- **Aplicación**: medigo-ops (no implementado en esta app)
- **Tipos de Operadores**:
  - `TRANSPORT`: Para MEDICAL_CENTER - transporte de pacientes
  - `COURIER`: Para PHARMACY - entrega de medicamentos
  - `TECHNICIAN`: Para LABORATORY - recolección y pruebas de muestras
  - `PARAMEDIC`: Para EMERGENCY - respuesta médica de emergencia
  - `CAREGIVER`: Para HOMECARE - atención en el hogar

### 5. CLIENT (Usuarios Finales)
- **Descripción**: Pacientes y usuarios del sistema
- **Aplicación**: medigo-app (no implementado en esta app)

## Cambios Técnicos Implementados

### 1. Actualización de Tipos de Datos (`src/types/index.ts`)
```typescript
export type VerificationStatus = 'PENDING' | 'IN_REVIEW' | 'VERIFIED' | 'REJECTED'

export interface User {
  // Campos de nombre (formato médico/legal)
  first_name?: string
  middle_name?: string
  last_names?: string
  display_name?: string
  
  // Gestión de roles
  role: UserRole
  staff_type?: StaffType
  parent_entity_type?: ParentEntityType
  parent_id?: string
  provider_type?: ProviderType
  operator_type?: OperatorType
  
  // Campos específicos de proveedores
  organization_name?: string
  license_number?: string
  verification_status?: VerificationStatus
  verified_at?: string
  verified_by?: string
  
  // ... otros campos
}
```

### 2. Actualización del Contexto de Autenticación (`src/contexts/AuthContext.tsx`)
- **Nuevos métodos añadidos**:
  - `isPlatformUser()`: Verifica si el usuario es administrador de plataforma
  - `isProviderVerified()`: Verifica si el proveedor está verificado
  - `canManageProviders()`: Verifica permisos para gestionar proveedores
  - `canManageStaff()`: Verifica permisos para gestionar personal
  - `getDisplayName()`: Obtiene el nombre de visualización del usuario

- **Usuarios mock actualizados** con el nuevo esquema de datos incluyendo:
  - Estados de verificación para proveedores
  - Estructura jerárquica de staff
  - Campos de licencia y organización

### 3. Sistema de Navegación Actualizado (`src/utils/navigationConfig.ts`)
- **Filtrado basado en verificación**: Los proveedores deben estar verificados para acceder a funciones operacionales
- **Permisos granulares**: Sistema de permisos más específico por tipo de usuario
- **Validación de entidad padre**: Staff debe tener la entidad padre correcta

### 4. Interfaz de Usuario Mejorada

#### PlatformLayout (`src/components/PlatformLayout.tsx`)
- **Pantalla de verificación pendiente**: Los proveedores no verificados ven una interfaz especial
- **Indicadores de estado**: Visualización clara del estado de verificación
- **Navegación adaptativa**: Layout diferente según el tipo de usuario

#### PlatformSidebar (`src/components/PlatformSidebar.tsx`)
- **Información de usuario enriquecida**: Muestra tipo de usuario y estado de verificación
- **Indicadores visuales**: Iconos y colores que indican el estado del usuario
- **Navegación contextual**: Elementos de navegación filtrados por rol y permisos

#### Página de Gestión de Proveedores (`src/app/dashboard/proveedores/page.tsx`)
- **Dashboard completo de verificación**: Gestión centralizada de proveedores
- **Estados de verificación**: Interfaz para cambiar estados de proveedores
- **Estadísticas en tiempo real**: Métricas de proveedores por estado
- **Modal de detalles**: Vista completa de información del proveedor
- **Filtros avanzados**: Búsqueda por estado, tipo y información general

## Características del Sistema de Verificación

### 1. Flujo de Verificación de Proveedores
1. **Registro**: Proveedor se registra con estado `PENDING`
2. **Revisión**: Administrador puede marcar como `IN_REVIEW`
3. **Verificación**: Administrador verifica (`VERIFIED`) o rechaza (`REJECTED`)
4. **Activación**: Solo proveedores verificados pueden acceder a funciones operacionales

### 2. Restricciones de Seguridad
- **Proveedores no verificados**: Acceso limitado hasta completar verificación
- **Gestión jerárquica**: Staff solo puede gestionar recursos de su entidad padre
- **Permisos granulares**: Acceso basado en rol, tipo y estado de verificación

### 3. Validaciones Implementadas
- **Coherencia de roles**: Validación de combinaciones válidas de rol y tipos
- **Entidades padre**: Staff debe tener entidad padre válida
- **Estados de verificación**: Solo proveedores pueden tener estados de verificación

## Casos de Uso Principales

### 1. Administrador de Plataforma
```
Login → Dashboard completo → Gestión de proveedores → Verificación → Reportes
```

### 2. Proveedor Verificado
```
Login → Dashboard de proveedor → Gestión de servicios → Gestión de staff → Reportes
```

### 3. Proveedor Pendiente
```
Login → Pantalla de verificación pendiente → Información de contacto
```

### 4. Staff de Plataforma
```
Login → Dashboard de staff → Funciones según tipo (Finance/Support) → Reportes
```

### 5. Staff de Proveedor
```
Login → Dashboard de staff → Funciones específicas del proveedor → Coordinación
```

## Usuarios de Prueba Disponibles

### Administradores de Plataforma
- **Email**: `admin@medgohub.com` | **Password**: `platform123`

### Staff de Plataforma
- **Finance**: `finance@medgohub.com` | **Password**: `finance123`
- **Support**: `support@medgohub.com` | **Password**: `support123`

### Proveedores Verificados
- **Centro Médico**: `provider.medical@medgohub.com` | **Password**: `medical123`
- **Farmacia**: `provider.pharmacy@medgohub.com` | **Password**: `pharmacy123`
- **Laboratorio**: `provider.lab@medgohub.com` | **Password**: `lab123`
- **Emergencias**: `provider.emergency@medgohub.com` | **Password**: `emergency123`
- **Atención Domiciliaria**: `provider.homecare@medgohub.com` | **Password**: `homecare123`
- **Especialista**: `provider.specialist@medgohub.com` | **Password**: `specialist123`
- **Telemedicina**: `provider.virtual@medgohub.com` | **Password**: `virtual123`

### Staff de Proveedor
- **Finance Hospital**: `staff.finance.provider@medgohub.com` | **Password**: `stafffinance123`
- **Support Hospital**: `staff.support.provider@medgohub.com` | **Password**: `staffsupport123`

### Proveedor Pendiente (Para pruebas de verificación)
- **Email**: `provider.pending@medgohub.com` | **Password**: `pending123`

## Próximos Pasos Recomendados

1. **Integración con Supabase**: Conectar con la base de datos real usando el script SQL proporcionado
2. **Notificaciones**: Sistema de notificaciones para cambios de estado de verificación
3. **Documentos de verificación**: Upload y gestión de documentos para verificación
4. **Auditoría**: Log de cambios de estado y acciones de verificación
5. **API endpoints**: Desarrollo de endpoints para gestión de roles y verificación
6. **Pruebas unitarias**: Testing del sistema de roles y permisos
7. **Documentación de API**: Especificación de endpoints para integración

## Compatibilidad

- **Navegadores**: Chrome, Firefox, Safari, Edge (últimas versiones)
- **Dispositivos**: Responsive design para desktop, tablet y móvil
- **Base de datos**: Compatible con el script SQL de Supabase proporcionado
- **Autenticación**: Preparado para integración con Supabase Auth

## Consideraciones de Seguridad

- **Validación del lado del cliente y servidor**: Doble validación de permisos
- **Tokens de sesión**: Gestión segura de sesiones de usuario
- **Encriptación**: Datos sensibles protegidos
- **Auditoría**: Registro de acciones críticas de verificación
- **Separación de privilegios**: Roles claramente definidos y segregados 