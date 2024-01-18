$(document).ready(()=>{
    $("#request-login-modal").click(()=>{
        $("#signup-modal").modal('hide')
        $("#login-modal").modal('show')
    })
})

$(document).ready(()=>{
    $("#request-signup-modal").click(()=>{
        $("#login-modal").modal('hide')
        $("#signup-modal").modal('show')
    })
})

$(document).ready(()=>{
    $("#signup-form").submit((e)=>{
        e.preventDefault()
        $.ajax({
            type: "POST",
            url: "api/signup",
            data: new FormData(e.target),
            processData: false,
            contentType: false,
            success: (response)=>{
                console.log(response)
            },
            error: (err)=>{
                console.log(err)
            }
        })
    })
// login request
    $("#login-form").submit((e)=>{
        e.preventDefault()
        $.ajax({
            type: "POST",
            url: "api/login",
            data: new FormData(e.target),
            processData: false,
            contentType: false,
            success: (response)=>{
                if(response.isLogged)
                {
                    window.location = "/profile"
                }
            },
            error: (err)=>{
                console.log(err)
            }
        })
    })

})
