import { type ChangeEvent } from 'react';
import { useTaskStatusPermissions } from '../../../hooks/tasks/useTaskStatusPermissions';
import { CheckCircle, Clock, AlertCircle } from 'lucide-react';
import type { Task, TaskStatus } from '../../../types/task';