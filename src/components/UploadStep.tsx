import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Trash2, MoveUp, MoveDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAnalysisStore, Screenshot } from '../store/analysisStore';
import { AnalysisHeader } from './AnalysisHeader';
import { ProgressIndicator } from './ProgressIndicator';

export function UploadStep() {
  const navigate = useNavigate();
  const { screenshots, addScreenshots, removeScreenshot, reorderScreenshots, setCurrentStep } =
    useAnalysisStore();

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (screenshots.length + acceptedFiles.length > 30) {
        alert('Maximum 30 screenshots allowed');
        return;
      }

      const newScreenshots: Screenshot[] = acceptedFiles.map((file) => ({
        id: Math.random().toString(36).substring(7),
        file,
        preview: URL.createObjectURL(file),
      }));

      addScreenshots(newScreenshots);
    },
    [screenshots.length, addScreenshots]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': [],
    },
  });

  const onDragEnd = (result: any) => {
    if (!result.destination) return;
    reorderScreenshots(result.source.index, result.destination.index);
  };

  const handleNext = () => {
    if (screenshots.length === 0) {
      alert('Please upload at least one screenshot');
      return;
    }
    setCurrentStep(2);
    navigate('/analyze/names');
  };

  return (
    <div className="min-h-screen bg-[#FFF4E6] px-4">
      <AnalysisHeader />
      <section className="pt-10 pb-16">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-galindo text-[#DB0001] mb-2">WITA</h1>
          <h2 className="text-2xl md:text-3xl font-galindo text-center mb-10">1. Upload the conversation</h2>
        </div>

        {/* Main Content */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-10 max-w-7xl mx-auto mb-32">
          {/* Judge Image */}
          <div className="flex-shrink-0">
            <img 
              src="https://raw.githubusercontent.com/atareh/WITA/main/Judge-1.png" 
              alt="Judge" 
              className="w-60 md:w-80" 
            />
          </div>

          {/* Upload Box Container */}
          <div className="w-full max-w-2xl">
            {/* Upload Box */}
            <div className="bg-white border-2 border-black rounded-xl p-8 w-full shadow-lg">
              <h3 className="text-2xl md:text-3xl font-galindo mb-4 uppercase">Upload screenshots</h3>
              <p className="font-bold text-lg mb-6">
                Drop your screenshots here or click to upload. We accept PNGs, JPEGs, and screenshots from your phone.
              </p>
              <div
                {...getRootProps()}
                className={`border-2 border-dashed border-black rounded-lg h-48 flex items-center justify-center text-lg font-bold text-center cursor-pointer ${
                  isDragActive ? 'bg-gray-50' : ''
                }`}
              >
                <input {...getInputProps()} />
                {isDragActive ? 'Drop files here...' : '+ Drop files or click to upload'}
              </div>

              {/* Screenshots List */}
              {screenshots.length > 0 && (
                <div className="mt-8">
                  <h4 className="text-xl font-bold mb-4">
                    Uploaded Screenshots ({screenshots.length}/30)
                  </h4>
                  <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="screenshots">
                      {(provided) => (
                        <div {...provided.droppableProps} ref={provided.innerRef}>
                          {screenshots.map((screenshot, index) => (
                            <Draggable
                              key={screenshot.id}
                              draggableId={screenshot.id}
                              index={index}
                            >
                              {(provided) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg mb-2"
                                >
                                  <span className="text-lg font-semibold">{index + 1}</span>
                                  <img
                                    src={screenshot.preview}
                                    alt={`Screenshot ${index + 1}`}
                                    className="w-32 h-32 object-cover rounded"
                                  />
                                  <div className="flex-grow">
                                    <p className="text-sm">{screenshot.file.name}</p>
                                  </div>
                                  <div className="flex gap-2">
                                    {index > 0 && (
                                      <button className="p-2 text-gray-600 hover:text-red-600">
                                        <MoveUp size={20} />
                                      </button>
                                    )}
                                    {index < screenshots.length - 1 && (
                                      <button className="p-2 text-gray-600 hover:text-red-600">
                                        <MoveDown size={20} />
                                      </button>
                                    )}
                                    <button
                                      onClick={() => removeScreenshot(screenshot.id)}
                                      className="p-2 text-gray-600 hover:text-red-600"
                                    >
                                      <Trash2 size={20} />
                                    </button>
                                  </div>
                                </div>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </DragDropContext>
                </div>
              )}
            </div>

            {/* Navigation Buttons - Now aligned with the upload box */}
            <div className="flex justify-between mt-6">
              <button
                onClick={() => navigate('/')}
                className="px-6 py-2 text-gray-600 hover:text-gray-800 font-bold"
              >
                Back
              </button>
              <button
                onClick={handleNext}
                disabled={screenshots.length === 0}
                className="px-6 py-2 bg-[#0658D6] text-white rounded hover:bg-blue-700 disabled:opacity-50 font-bold"
              >
                Next
              </button>
            </div>
          </div>
        </div>

        {/* Progress Indicator */}
        <ProgressIndicator />
      </section>
    </div>
  );
}