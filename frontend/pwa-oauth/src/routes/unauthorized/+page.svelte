<script>
    // User information (would normally come from auth context)
    const user = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      picture: '/placeholder.svg'
    };
  
    // Club PORs contact information
    const clubPORs = [
      { name: 'Akshay Arjun', role: 'President', email: 'f20220507@hyderabad.bits-pilani.ac.in' },
      { name: 'Hemanth Karthikeya Ganti', role: 'Secretary', email: 'f20220053@hyderabad.bits-pilani.ac.in' },
      { name: 'T Karan Balakumar', role: 'Secretary', email: 'f20221736@hyderabad.bits-pilani.ac.in' }
    ];
  
    // Function to handle logout
    function handleLogout() {
      // In a real app, this would clear auth state and redirect
      console.log('Logging out...');
      // window.location.href = '/login';
    }
  </script>
  
  <div class="min-h-screen bg-[#121212] flex flex-col">
  
    <div class="flex-grow flex items-center justify-center p-4">
      <div class="max-w-2xl w-full">
        <div class="border border-[#333333] shadow-lg rounded-xl overflow-hidden bg-[#2A2A2A]">
          <!-- Header with warning icon -->
          <div class="p-6 bg-[#FF4413] flex items-center gap-4">
            <div class="h-12 w-12 bg-white rounded-full flex items-center justify-center text-[#FF4413] text-2xl font-bold">
              !
            </div>
            <h2 class="font-bold text-xl text-white">Access Denied</h2>
          </div>
          
          <!-- Main content -->
          <div class="p-6">
            <div class="mb-6 text-center">
              <h3 class="text-xl font-semibold text-white mb-4">You are not authorized to access this application</h3>
              <p class="text-gray-300 mb-2">
                We've detected that your email address <span class="text-[#FF4413] font-medium">{user.email}</span> is not registered as a member of the robotics club.
              </p>
              <p class="text-gray-300">
                Only club members have access to the Robokit inventory management system.
              </p>
            </div>
            
            <!-- Divider -->
            <div class="border-t border-[#333333] my-6"></div>
            
            <!-- Contact information -->
            <div class="mb-6">
              <h4 class="text-lg font-medium text-white mb-3 flex items-center">
                <div class="w-2 h-5 bg-[#6AB1EB] rounded-full mr-2"></div>
                Contact Club PORs for Access
              </h4>
              
              <div class="space-y-4">
                {#each clubPORs as por}
                  <div class="bg-[#1E1E1E] p-4 rounded-lg border-l-4 border-[#6AB1EB]">
                    <div class="flex items-center gap-3">
                      <div class="h-10 w-10 bg-[#6AB1EB] rounded-full flex items-center justify-center text-white font-medium">
                        {por.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h5 class="font-medium text-white">{por.name}</h5>
                        <p class="text-sm text-gray-400">{por.role}</p>
                      </div>
                    </div>
                    <div class="mt-3 pl-13">
                      <a href={`mailto:${por.email}`} class="text-[#6AB1EB] hover:underline text-sm">
                        {por.email}
                      </a>
                    </div>
                  </div>
                {/each}
              </div>
            </div>
            
            <!-- Actions -->
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                on:click={handleLogout}
                class="bg-[#FF4413] hover:bg-[#FF4413]/90 text-white px-6 py-2 rounded-md font-medium"
              >
                Return to Login
              </button>
              
              <a 
                href="https://forms.example.com/join-club" 
                target="_blank"
                class="bg-[#1E1E1E] border border-[#6AB1EB] text-[#6AB1EB] hover:bg-[#6AB1EB]/10 px-6 py-2 rounded-md font-medium text-center"
              >
                Apply for Membership
              </a>
            </div>
          </div>
          
          <!-- Footer -->
          <div class="p-4 bg-[#1E1E1E] border-t border-[#333333] text-center">
            <p class="text-sm text-gray-400">
              If you believe this is an error, please contact 
              <a href="mailto:support@robokit.example.com" class="text-[#FEFB0E] hover:underline">
                support@robokit.example.com
              </a>
            </p>
          </div>
        </div>
        
        <!-- Additional information -->
        <div class="mt-6 bg-[#1E1E1E] border-l-4 border-[#FEFB0E] p-4 rounded-r-lg">
          <h4 class="text-white font-medium mb-2 flex items-center">
            <div class="w-2 h-4 bg-[#FEFB0E] rounded-full mr-2"></div>
            About Robokit
          </h4>
          <p class="text-gray-300 text-sm">
            Robokit is the official inventory management system for the robotics club. 
            It helps members track, borrow, and manage equipment for projects and competitions.
          </p>
        </div>
      </div>
    </div>
  </div>