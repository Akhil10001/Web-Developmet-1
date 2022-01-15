let showList = $('#showList').hide();
let searchForm = $('#searchForm');
let search_term= $('#search_term');
let show=$('#show').hide();
let error=$("#error");
let homeLink=$("#homeLink");


(function($){


    $( document ).ready(function() {

        showList.show()
        homeLink.hide()

       var requestConfig={
        method: 'GET',
		url: 'http://api.tvmaze.com/shows'
    }

  

    $.ajax(requestConfig).then(function(responseMessage) {
        

        $.each(responseMessage, function(element, shows){
           
            
            showList.append($('<li>'+'<a href='+shows._links.self.href+'>'+shows.name+'</a>'+'</li>'))

        })


    })


    


    searchForm.submit(function(event) {
        event.preventDefault();

        error.empty()
        if(!search_term.val() || search_term.val().trim()==0)
        {
            error.append("Please Enter Search Term")

            showList.empty()

            show.empty()

            homeLink.show()
        }

        else
        {

           

        var requestConfig={
            method: 'GET',
            url: `http://api.tvmaze.com/search/shows?q=`+search_term.val()
        }
        

        
    $.ajax(requestConfig).then(function(responseMessage) {
        
       
        showList.empty()
        show.hide()

        $.each(responseMessage, function(element, shows){
           
            
            showList.append($('<li>'+'<a href='+shows.show._links.self.href+'>'+shows.show.name+'</a>'+'</li>'))

        })


    })

    showList.show()
    homeLink.show()
        }
    
    })







    
        $(showList).on('click', function(event) {
        event.preventDefault();
        
        var url=event.target.href
        

       var id = url.substring(url.lastIndexOf('/') + 1);

        var requestConfig={
            method: 'GET',
            url: 'http://api.tvmaze.com/shows/'+id
        }


       



        $.ajax(requestConfig).then(function(responseMessage) {
        
            show.empty()
            showList.hide()

            
            var items=[]
            var item

            

            if(responseMessage.genres==null)
            {
                item='<dd>N/A</dd>'
            }

            else{

            $.each(responseMessage.genres, function(element, shows){

               items.push('<li>'+shows+'</li>')
    
            })

            item='<dd>'+'<ul>'+items.join('')+'</ul>'+'</dd>'

        }

            let networkName
            let averageRating
            let language
            let image
            let summary
            let name

            if(responseMessage.network==null){
                networkName ='<dd>N/A</dd>'
            }
            else
            {
                networkName='<dd>'+responseMessage.network.name+'</dd>' 
            }

            if(responseMessage.rating.average==null)
            {
                averageRating= '<dd>N/A</dd>'
            }
            else
            {

                averageRating='<dd>'+responseMessage.rating.average+'</dd>'
            }


            if(responseMessage.language==null)
            {
                language='<dd>N/A</dd>'
            }
            else
            {
                language='<dd>'+responseMessage.language+'</dd>'
            }


            if(responseMessage.image==null)
            {
                image='<img src='+'/public/no_image.jpeg'+'>'
            }
            else{
                
               image= '<img src='+responseMessage.image.medium+'>'
            }


            if(responseMessage.summary==null)
            {
                summary='<dd>N/A</dd>'
            }
            else
            {
                summary='<dd>'+responseMessage.summary+'</dd>'
            }


            if(responseMessage.name==null)
            {
                name='<h1>N/A</h1>'
            }
            else
            {
                name='<h1>'+responseMessage.name+'</h1>'
            }

            show.append( name+ image+
                            '<dl>'+
                        '<dt>Language</dt>'+
                                language+
                        '<dt>Genres</dt>'+
                               item+
                        '<dt>Average Rating</dt>'+
                                averageRating+
                        '<dt>Network</dt>'+
                             networkName+
                        '<dt>Summary</dt>'+
                            summary
                        +'</dl>')


                        show.show()

                        homeLink.show()

    
    
        })
    
    })


      })


    


    
})(window.jQuery);