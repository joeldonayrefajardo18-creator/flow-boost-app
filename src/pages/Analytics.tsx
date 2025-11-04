import { Navbar } from '@/components/layout/Navbar';
import { useTasks } from '@/contexts/TaskContext';
import { useColumns } from '@/contexts/ColumnContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

const Analytics = () => {
  const { tasks } = useTasks();
  const { columns } = useColumns();

  // Map column colors to HSL values
  const getColorValue = (colorClass: string) => {
    const colorMap: Record<string, string> = {
      'bg-muted': 'hsl(var(--muted))',
      'bg-primary/10': 'hsl(var(--primary))',
      'bg-warning/10': 'hsl(var(--warning))',
      'bg-success/10': 'hsl(var(--success))',
      'bg-destructive/10': 'hsl(var(--destructive))',
      'bg-blue-500/10': 'hsl(217, 91%, 60%)',
      'bg-purple-500/10': 'hsl(271, 81%, 56%)',
      'bg-pink-500/10': 'hsl(330, 81%, 60%)',
    };
    return colorMap[colorClass] || 'hsl(var(--primary))';
  };

  const statusData = columns.map(column => ({
    name: column.title,
    value: tasks.filter(t => t.status === column.id).length,
    fill: getColorValue(column.color),
  }));

  const priorityData = [
    { name: 'High', count: tasks.filter(t => t.priority === 'high').length, fill: 'hsl(var(--destructive))' },
    { name: 'Medium', count: tasks.filter(t => t.priority === 'medium').length, fill: 'hsl(var(--warning))' },
    { name: 'Low', count: tasks.filter(t => t.priority === 'low').length, fill: 'hsl(var(--success))' },
  ];

  // Find completed column (usually the last one, or one with "completed" in name)
  const completedColumn = columns.find(c => 
    c.title.toLowerCase().includes('completed') || 
    c.title.toLowerCase().includes('done')
  ) || columns[columns.length - 1];

  const completionRate = tasks.length > 0 && completedColumn
    ? Math.round((tasks.filter(t => t.status === completedColumn.id).length / tasks.length) * 100)
    : 0;

  const activeTasks = completedColumn 
    ? tasks.filter(t => t.status !== completedColumn.id).length
    : tasks.length;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Analytics</h1>
          <p className="text-muted-foreground">
            Track your productivity and task completion rates
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardDescription>Total Tasks</CardDescription>
              <CardTitle className="text-4xl">{tasks.length}</CardTitle>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CardDescription>Completion Rate</CardDescription>
              <CardTitle className="text-4xl">{completionRate}%</CardTitle>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CardDescription>Active Tasks</CardDescription>
              <CardTitle className="text-4xl">{activeTasks}</CardTitle>
            </CardHeader>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Tasks by Status</CardTitle>
              <CardDescription>Distribution of tasks across different stages</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  value: {
                    label: "Tasks",
                  },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={statusData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}`}
                      outerRadius={100}
                      dataKey="value"
                    >
                      {statusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tasks by Priority</CardTitle>
              <CardDescription>Priority distribution of all tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  count: {
                    label: "Tasks",
                  },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={priorityData}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                      {priorityData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Analytics;
