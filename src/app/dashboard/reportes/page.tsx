'use client';

import { useState } from 'react';
import DashboardLayout from "@/components/DashboardLayout";
import { BarChart3, Download, Calendar, Filter, TrendingUp, Users, DollarSign, Activity, X, FileText, CheckCircle, Eye } from "lucide-react";

// Tipos para reportes
interface Report {
  id: string;
  title: string;
  description: string;
  type: 'USERS' | 'FINANCIAL' | 'ACTIVITY' | 'PERFORMANCE';
  icon: any;
  color: string;
  lastGenerated: string;
  status: 'completed' | 'generating' | 'failed';
  size?: string;
  downloadUrl?: string;
}

interface GeneratedReport {
  id: string;
  name: string;
  date: string;
  size: string;
  type: 'PDF' | 'Excel' | 'CSV';
  category: string;
  downloadUrl: string;
}

interface DateFilter {
  startDate: string;
  endDate: string;
  period: 'custom' | 'last_month' | 'last_3_months' | 'last_year';
}

// Tipos de reportes disponibles
const reportTypes: Report[] = [
  {
    id: 'users',
    title: "Reporte de Usuarios",
    description: "Estadísticas de usuarios activos, registros y actividad",
    type: 'USERS',
    icon: Users,
    color: "bg-blue-100 text-blue-600",
    lastGenerated: "Hace 2 horas",
    status: 'completed'
  },
  {
    id: 'financial',
    title: "Reporte Financiero",
    description: "Ingresos, gastos y análisis financiero mensual",
    type: 'FINANCIAL',
    icon: DollarSign,
    color: "bg-green-100 text-green-600",
    lastGenerated: "Hace 1 día",
    status: 'completed'
  },
  {
    id: 'activity',
    title: "Reporte de Actividad",
    description: "Actividad del sistema, consultas y servicios",
    type: 'ACTIVITY',
    icon: Activity,
    color: "bg-purple-100 text-purple-600",
    lastGenerated: "Hace 3 horas",
    status: 'completed'
  },
  {
    id: 'performance',
    title: "Reporte de Rendimiento",
    description: "Métricas de rendimiento y estadísticas de uso",
    type: 'PERFORMANCE',
    icon: TrendingUp,
    color: "bg-orange-100 text-orange-600",
    lastGenerated: "Hace 6 horas",
    status: 'completed'
  }
];

// Reportes generados iniciales
const initialGeneratedReports: GeneratedReport[] = [
  { 
    id: '1', 
    name: "Reporte Mensual de Usuarios - Diciembre 2024", 
    date: "24/12/2024", 
    size: "2.3 MB", 
    type: "PDF",
    category: "Usuarios",
    downloadUrl: "/reports/users-december-2024.pdf"
  },
  { 
    id: '2', 
    name: "Análisis Financiero Q4 2024", 
    date: "20/12/2024", 
    size: "1.8 MB", 
    type: "Excel",
    category: "Financiero",
    downloadUrl: "/reports/financial-q4-2024.xlsx"
  },
  { 
    id: '3', 
    name: "Reporte de Actividad Semanal", 
    date: "18/12/2024", 
    size: "945 KB", 
    type: "PDF",
    category: "Actividad",
    downloadUrl: "/reports/activity-weekly.pdf"
  },
  { 
    id: '4', 
    name: "Estadísticas de Rendimiento", 
    date: "15/12/2024", 
    size: "1.2 MB", 
    type: "PDF",
    category: "Rendimiento",
    downloadUrl: "/reports/performance-stats.pdf"
  }
];

const quickStats = [
  {
    title: "Reportes Generados",
    value: "156",
    change: "+12%",
    changeType: "positive",
    icon: BarChart3
  },
  {
    title: "Descargas Este Mes",
    value: "89",
    change: "+8%",
    changeType: "positive",
    icon: Download
  },
  {
    title: "Usuarios Activos",
    value: "1,234",
    change: "+15%",
    changeType: "positive",
    icon: Users
  },
  {
    title: "Ingresos Totales",
    value: "$45,678",
    change: "+23%",
    changeType: "positive",
    icon: DollarSign
  }
];

// Modal para generar reportes
const GenerateReportModal = ({ 
  isOpen, 
  onClose, 
  reportType,
  onGenerate 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  reportType: Report | null;
  onGenerate: (config: any) => void;
}) => {
  const [config, setConfig] = useState({
    format: 'PDF',
    includeCharts: true,
    includeRawData: false,
    dateRange: {
      startDate: '',
      endDate: '',
      period: 'last_month'
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate({
      reportType: reportType?.type,
      ...config,
      startDate: config.dateRange.startDate,
      endDate: config.dateRange.endDate,
      period: config.dateRange.period
    });
    onClose();
  };

  if (!isOpen || !reportType) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            Generar {reportType.title}
          </h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Formato del Reporte
            </label>
            <select
              value={config.format}
              onChange={(e) => setConfig({ ...config, format: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="PDF">PDF</option>
              <option value="Excel">Excel</option>
              <option value="CSV">CSV</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Período de Datos
            </label>
            <select
              value={config.dateRange.period}
              onChange={(e) => setConfig({ 
                ...config, 
                dateRange: { ...config.dateRange, period: e.target.value }
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="last_month">Último mes</option>
              <option value="last_3_months">Últimos 3 meses</option>
              <option value="last_year">Último año</option>
              <option value="custom">Personalizado</option>
            </select>
          </div>

          {config.dateRange.period === 'custom' && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fecha Inicio
                </label>
                <input
                  type="date"
                  value={config.dateRange.startDate}
                  onChange={(e) => setConfig({ 
                    ...config, 
                    dateRange: { ...config.dateRange, startDate: e.target.value }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fecha Fin
                </label>
                <input
                  type="date"
                  value={config.dateRange.endDate}
                  onChange={(e) => setConfig({ 
                    ...config, 
                    dateRange: { ...config.dateRange, endDate: e.target.value }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
          )}

          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              Opciones del Reporte
            </label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={config.includeCharts}
                  onChange={(e) => setConfig({ ...config, includeCharts: e.target.checked })}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">Incluir gráficos y visualizaciones</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={config.includeRawData}
                  onChange={(e) => setConfig({ ...config, includeRawData: e.target.checked })}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">Incluir datos sin procesar</span>
              </label>
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Generar Reporte
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Modal para vista previa de reporte
const ReportPreviewModal = ({ 
  isOpen, 
  onClose, 
  report 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  report: GeneratedReport | null;
}) => {
  if (!isOpen || !report) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Vista Previa del Reporte</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{report.name}</h3>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <span>Generado el {report.date}</span>
              <span>•</span>
              <span>{report.size}</span>
              <span>•</span>
              <span>{report.type}</span>
            </div>
          </div>

          {/* Simulación de vista previa */}
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <div className="text-center text-gray-500">
              <FileText className="w-16 h-16 mx-auto mb-4" />
              <p className="text-lg font-medium mb-2">Vista Previa del Contenido</p>
              <p className="text-sm">
                Este reporte contiene análisis detallado de {report.category.toLowerCase()} 
                con gráficos, tablas y estadísticas comprehensivas.
              </p>
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cerrar
            </button>
            <button
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Descargar</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function ReportesPage() {
  const [reports, setReports] = useState<Report[]>(reportTypes);
  const [generatedReports, setGeneratedReports] = useState<GeneratedReport[]>(initialGeneratedReports);
  const [selectedReportType, setSelectedReportType] = useState<string>('all');
  const [selectedPeriod, setSelectedPeriod] = useState<string>('last_month');
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [selectedGeneratedReport, setSelectedGeneratedReport] = useState<GeneratedReport | null>(null);
  const [isGenerating, setIsGenerating] = useState<string | null>(null);

  // Filtrar reportes generados
  const filteredGeneratedReports = generatedReports.filter(report => {
    const matchesType = selectedReportType === 'all' || 
                       report.category.toLowerCase().includes(selectedReportType.toLowerCase());
    return matchesType;
  });

  // Handlers
  const handleGenerateReport = (reportType: Report) => {
    setSelectedReport(reportType);
    setShowGenerateModal(true);
  };

  const handleStartGeneration = (config: any) => {
    if (!selectedReport) return;
    
    setIsGenerating(selectedReport.id);
    
    // Simular generación de reporte
    setTimeout(() => {
      const newReport: GeneratedReport = {
        id: Date.now().toString(),
        name: `${selectedReport.title} - ${new Date().toLocaleDateString('es-ES')}`,
        date: new Date().toLocaleDateString('es-ES'),
        size: `${Math.floor(Math.random() * 3) + 1}.${Math.floor(Math.random() * 9)}MB`,
        type: config.format,
        category: selectedReport.title.split(' ')[2] || selectedReport.title,
        downloadUrl: `/reports/generated-${Date.now()}.${config.format.toLowerCase()}`
      };

      setGeneratedReports(prev => [newReport, ...prev]);
      setIsGenerating(null);
      
      // Actualizar último generado
      setReports(prev => prev.map(r => 
        r.id === selectedReport.id 
          ? { ...r, lastGenerated: 'Hace unos segundos', status: 'completed' as const }
          : r
      ));
    }, 3000);
  };

  const handleDownload = (report: GeneratedReport) => {
    // Simular descarga
    const link = document.createElement('a');
    link.href = report.downloadUrl;
    link.download = report.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePreview = (report: GeneratedReport) => {
    setSelectedGeneratedReport(report);
    setShowPreviewModal(true);
  };

  const handleExportAll = () => {
    // Simular exportación masiva
    alert('Exportando todos los reportes... Esta funcionalidad se completará en breve.');
  };

  const handleApplyFilters = () => {
    // Los filtros se aplican automáticamente mediante el estado
    console.log(`Filtros aplicados: Tipo=${selectedReportType}, Período=${selectedPeriod}`);
  };

  return (
    <DashboardLayout currentPage="/dashboard/reportes">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Reportes y Estadísticas</h1>
            <p className="text-gray-600">Genera y descarga reportes del sistema</p>
          </div>
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => alert('Selector de período personalizado')}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Calendar className="w-4 h-4" />
              <span>Período</span>
            </button>
            <button 
              onClick={handleExportAll}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Exportar Todo</span>
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-sm text-gray-600">{stat.title}</div>
                  <Icon className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex items-end justify-between">
                  <div className="text-3xl font-semibold text-gray-900">{stat.value}</div>
                  <div className={`text-sm flex items-center ${
                    stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    <TrendingUp className="w-4 h-4 mr-1" />
                    {stat.change}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipo de Reporte
              </label>
              <select 
                value={selectedReportType}
                onChange={(e) => setSelectedReportType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Todos los reportes</option>
                <option value="usuarios">Reportes de usuarios</option>
                <option value="financiero">Reportes financieros</option>
                <option value="actividad">Reportes de actividad</option>
                <option value="rendimiento">Reportes de rendimiento</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Período
              </label>
              <select 
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="last_month">Último mes</option>
                <option value="last_3_months">Últimos 3 meses</option>
                <option value="last_year">Último año</option>
                <option value="custom">Personalizado</option>
              </select>
            </div>
            <div className="flex items-end">
              <button 
                onClick={handleApplyFilters}
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Filter className="w-4 h-4" />
                <span>Aplicar Filtros</span>
              </button>
            </div>
          </div>
        </div>

        {/* Report Types */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reports.map((report) => {
            const Icon = report.icon;
            const isCurrentlyGenerating = isGenerating === report.id;
            
            return (
              <div key={report.id} className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${report.color}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{report.title}</h3>
                        <p className="text-sm text-gray-600">{report.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      {report.status === 'completed' && (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      )}
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm text-gray-500">
                      Última generación: {report.lastGenerated}
                    </p>
                  </div>

                  <div className="flex items-center space-x-3">
                    <button 
                      onClick={() => handleGenerateReport(report)}
                      disabled={isCurrentlyGenerating}
                      className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
                        isCurrentlyGenerating 
                          ? 'bg-gray-400 text-white cursor-not-allowed'
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                      }`}
                    >
                      {isCurrentlyGenerating ? 'Generando...' : 'Generar Reporte'}
                    </button>
                    <button 
                      onClick={() => handleDownload(generatedReports[0])}
                      className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Recent Reports */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              Reportes Recientes ({filteredGeneratedReports.length})
            </h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {filteredGeneratedReports.map((report) => (
                <div key={report.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <BarChart3 className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">{report.name}</h4>
                      <p className="text-sm text-gray-500">{report.date} • {report.size} • {report.type}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => handlePreview(report)}
                      className="p-2 hover:bg-gray-200 rounded-lg transition-colors text-gray-600"
                      title="Vista previa"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDownload(report)}
                      className="p-2 hover:bg-gray-200 rounded-lg transition-colors text-gray-600"
                      title="Descargar"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty state */}
            {filteredGeneratedReports.length === 0 && (
              <div className="text-center py-8">
                <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No hay reportes generados</h3>
                <p className="text-gray-600">
                  Genera tu primer reporte seleccionando uno de los tipos disponibles arriba.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Modales */}
        <GenerateReportModal
          isOpen={showGenerateModal}
          onClose={() => {
            setShowGenerateModal(false);
            setSelectedReport(null);
          }}
          reportType={selectedReport}
          onGenerate={handleStartGeneration}
        />

        <ReportPreviewModal
          isOpen={showPreviewModal}
          onClose={() => {
            setShowPreviewModal(false);
            setSelectedGeneratedReport(null);
          }}
          report={selectedGeneratedReport}
        />
      </div>
    </DashboardLayout>
  );
} 